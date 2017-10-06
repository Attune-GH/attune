import React from 'react'
import Slider from 'react-slick'
import { Image } from 'react-bootstrap'
import UserProfile from './UserProfile'
import OneMatch from './OneMatch'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class SimpleSlider extends React.Component {


  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    }
    //we need to pass in match props
    //assuming state.matches is an array of 4 and that it is sorted
    //this is a big assumption
    //(when we assume we make an ass of u and me)

    return (
      const matches = props.matches
      <div >
        <h1>Your Matches</h1>
        <Slider {...settings} className="container">
        {matches .map(match => {
          <div><OneMatch match={match}/></div>
        })}
        </Slider>
        <div>Swipe Through</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches
  }
}

export default withRouter(connect(mapStateToProps)(SimpleSlider))
