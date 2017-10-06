import React from 'react'
import Slider from 'react-slick'
import { Image } from 'react-bootstrap'
import UserProfile from './UserProfile'
import OneMatch from './OneMatch'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getMatches } from 'APP/fire/refs'

class SimpleSlider extends React.Component {

  constructor(props) {
    super()
    this.state = {
      matches: []
    }
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

  componentWillReceiveProps(nextProps){
    if(this.props.user.uid !== nextProps.user.uid){
    }
  }

  componentDidMount() {
    const uid = this.props.user.uid
    getMatches(uid).then(matches => this.setState({ matches }))
  }

    return (
      const matches = this.state.matches
      console.log(matches)
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
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(SimpleSlider))
