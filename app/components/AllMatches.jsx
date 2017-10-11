import React from 'react'
import Slider from 'react-slick'
import { Image } from 'react-bootstrap'
import UserProfile from './UserProfile'
import OneMatch from './OneMatch'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getMatches } from 'APP/fire/refs'
import firebase from 'APP/fire'

import store, { constantlyUpdateUser } from '../store'

class SimpleSlider extends React.Component {

  constructor(props) {
    super()
    this.state = {
      matches: []
    }
  }

  //not sure i understand this function --eks
  componentWillReceiveProps(nextProps) {
    if (this.props.user.uid !== nextProps.user.uid) {
      getMatches(nextProps.user.uid).then(matches => {
      this.setState({matches})
    })
    }
  }


componentDidMount() {
      store.dispatch(constantlyUpdateUser())
      const uid = this.props.user.uid
      firebase.database().ref(`Users/${uid}/matches/matchScores`).on("child_added", ()=> {
          getMatches(uid).then(matches => this.setState({ matches }))
      })
    }

  render() {


      let matches
      matches = (this.state.matches ? this.state.matches : [])
      let matchNames = Object.keys(matches)
      var sortable = [];
      for (var person in matches) {
        sortable.push([person, matches[person]]);
      }


      const goodMatches = sortable.filter(element => element[1] >= 0.02)

      const betterArr = goodMatches.sort(function (a, b) {
        return b[1] - a[1];
      })


      var settings = {
      initialSlide: 0,
      slickGoTo: 0,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    }

    const shrugMen = "¯\\_(ツ)_/¯"

    const loading = ( <div className="container matches">
          <h1 style={{maxWidth: '350px', textAlign: 'center'}}>Calculating Good Friends 4 U</h1>
           <img src="/img/Radio.svg" className="load" />
          </div>)

    const loaded = (
        <div>
            {betterArr.length ?
            (<Slider {...settings} className="container">
            {betterArr.map(match =>{
              return <div key={match[0]}><OneMatch match={match} /></div>})}
           </Slider>)
            :
            <div className="container profile">
              <h3> Looks like u don't listen to any music</h3>
              <h2>{shrugMen}</h2>
            </div>
            }
        </div>)

      return (
      <div style={{overflow: 'hidden'}}>
      {(typeof this.state.matches === 'object') ? loaded : loading}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(SimpleSlider))
