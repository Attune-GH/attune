import React from 'react'
import Slider from 'react-slick'
import { Image } from 'react-bootstrap'
import UserProfile from './UserProfile'
import OneMatch from './OneMatch'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getMatches } from 'APP/fire/refs'
import store, {constantlyUpdateUser} from '../store'

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
    store.dispatch(constantlyUpdateUser())
    const user = this.props.user
    console.log(user)
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
    // const matchesSorted = Object.keys(matches).sort(function(a,b){return list[b]-list[a]})
    var sortable = [];
    for (var person in matches) {
    sortable.push([person, matches[person]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    console.log('sorted', sortable)
    var matchesSorted ={}

    for (let i = 0; i <= sortable.length-1; i++) {
      matchesSorted[sortable[i][0]] = sortable[i][1]
    }
    console.log('matches sorted', matchesSorted)
    const matchesKeys = Object.keys(matchesSorted)
    console.log(matchesKeys)

    return (
      <div >
        <h1>Your Matches, sorted by compatibility!!!!</h1>

        {matchesKeys && matchesKeys.map(match =>
          <h3>You have a {(matchesSorted[match])*200}% match with {match.slice(13)}</h3>
        )}
      </div>
    )
  }
}

//<div><OneMatch match={match}/></div>
//        <Slider {...settings} className="container">
//        </Slider>
//<div>Swipe Through</div>
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(SimpleSlider))
