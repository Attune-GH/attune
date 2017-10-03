import React from 'react'
import Slider from 'react-slick'
import { Image } from 'react-bootstrap'
import UserProfile from './UserProfile'
import OneMatch from './OneMatch'

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
    return (
      <div >
        <h1>Your Matches</h1>
        <Slider {...settings} className="container">
          <div><OneMatch /></div>
          <div><OneMatch /></div>
          <div><OneMatch /></div>
          <div><OneMatch /></div>
        </Slider>
        <div>Swipe Through</div>
      </div>
    )
  }
}

export default SimpleSlider
