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


  componentWillReceiveProps(nextProps){
    if(this.props.user.uid !== nextProps.user.uid){
    }
  }

  componentDidMount() {
    const uid = this.props.user.uid
    console.log('uid', uid)
    getMatches(uid).then(matches => this.setState({ matches }))
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

    const matches = this.state.matches
    const matchNames = Object.keys(matches)
    console.log('matches obj', matches)
    console.log('matches keys', matchNames)
    return (
      <div >
        <h1>Your Matches!!!!</h1>

        {matches && matchNames.map(match =>
          <h1>{match.slice(13)}</h1>
        )}

        <div>Swipe Through</div>
      </div>
    )
  }
}

//<div><OneMatch match={match}/></div>
//        <Slider {...settings} className="container">
//        </Slider>
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(SimpleSlider))
