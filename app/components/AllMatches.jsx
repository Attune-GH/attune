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
      getMatches(nextProps.user.uid).then(matches =>
      this.setState({matches}))
      .then(results => console.log(this.state.matches))
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
      console.log('matches 53', matches)
      let matchNames = Object.keys(matches)
      var sortable = [];
      console.log('sortable', sortable)
      for (var person in matches) {
        sortable.push([person, matches[person]]);
      }

      const betterArr = sortable.sort(function (a, b) {
        return b[1] - a[1];
      })

      console.log('betterArr[0]', betterArr[0])

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

      return (
        <div>
          <div className="container matches">
            {/* <h2>Your Matches</h2> */}
          </div>
          <Slider {...settings} className="container">
            {betterArr.length === sortable.length && betterArr.map(match =>{
              console.log(match, new Date())
              return <div key={match[0]}><OneMatch match={match} /></div>
          })
            }
          </Slider>

        {/* <div className="container matches"><h3>Swipe Through</h3></div> */}
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
