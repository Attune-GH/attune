import React from 'react'
import Slider from 'react-slick'
import { Image } from 'react-bootstrap'
import UserProfile from './UserProfile'

class SimpleSlider extends React.Component {

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }
    return (
      <div className="container">
        <h1>Your Matches</h1>
        <Slider {...settings}>
          <div><UserProfile /></div>
          <div><UserProfile /></div>
          <div><UserProfile /></div>
          <div><UserProfile /></div>
        </Slider>
      </div>
    )
  }
}

export default SimpleSlider
