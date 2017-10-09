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
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    }

    let matches
    matches = (this.state.matches ? this.state.matches : [])
    let matchNames = Object.keys(matches)
    var sortable = [];
    for (var person in matches) {
      sortable.push([person, matches[person]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
      console.log(sortable)
    })

    return (
      <div>
        <div className="container matches"><h2>Your Matches</h2></div>
        <Slider {...settings} className="container">
          {sortable && sortable.map(match =>
            <div key={match[0]}><OneMatch match={match} /></div>)}
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
