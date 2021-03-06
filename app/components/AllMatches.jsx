import React from 'react'
import { withRouter } from 'react-router'
import firebase from 'APP/fire'
import { getMatches, getTopArtists, getTopTracks } from 'APP/fire/refs'
import UserProfile from './UserProfile'
import OneMatch from './OneMatch'
import { Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import store, { constantlyUpdateUser } from '../store'

class SimpleSlider extends React.Component {

  constructor(props) {
    super()
    this.state = {
      matches: [],
      infoBool: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.uid !== nextProps.user.uid) {
      getMatches(nextProps.user.uid).then(matches => {
        this.setState({matches})})
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
    var matchesArr = [];
    for (var person in matches) {
      matchesArr.push([person, matches[person]]);
    }


    var doesntListenToMusic = Boolean(matchesArr.length) && matchesArr.every(element => element[1] === 0)

    const intermediateGoodMatch = matchesArr.filter(element => element[1] >= 0.02)


    let goodMatches = ((matchesArr.length && doesntListenToMusic) ?
                   'doesnt listen to music' :
                   intermediateGoodMatch
                   )


    const betterArr = (Array.isArray(goodMatches) ? goodMatches.sort(function (a, b) {
      return b[1] - a[1]
    }) : goodMatches)


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
            {betterArr.length ? (
              (typeof betterArr === 'string' ?
                (<div className="container profile">
                  <h3> Looks like u don't listen to any music</h3>
                  <h2>{shrugMen}</h2>
                </div>)
                 :
                (<Slider {...settings} className="container">
                {betterArr.map(match =>{
                  return <div key={match[0]}><OneMatch match={match} /></div>})}
               </Slider>)
              ))
              :
              (<div className="container matches">
                 <h1 style={{maxWidth: '350px', textAlign: 'center'}}>Calculating Good Friends 4 U</h1>
                 <img src="/img/Radio.svg" className="load" />
              </div>)
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
