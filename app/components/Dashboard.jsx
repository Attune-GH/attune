import React, {Component} from 'react'
import {Route, IndexRedirect, IndexRoute, Link, Redirect} from 'react-router-dom'
import firebase from 'APP/fire'
import store, { fetchUser } from '../store'
import {connect} from 'react-redux'
const auth = firebase.auth()


class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.onRequestMatches = this.onRequestMatches.bind(this)
  }


  onRequestMatches() {
    firebase.database().ref(`Users/${this.props.userId}/requestMatches`).update({
      lastMatchRefreshRequested: new Date()
    });
  }


  render() {
    //text color should change on hover
    return (
      <div className="dashboard">
        <Link to={`/profile/${this.props.userId}`}style={{ textDecoration: 'none', color: 'white' }}><button className="btn btn-dashboard">Profile</button></Link>
        <Link to='/messages' style={{ textDecoration: 'none', color: 'white'  }}><button className="btn btn-dashboard">Messages</button></Link>
        <Link to='/following' style={{ textDecoration: 'none', color: 'white'  }}><button className='btn btn-dashboard' >Following</button></Link>
        <Link to='/matches' style={{ textDecoration: 'none', color: 'white'  }}><button className='btn btn-dashboard' onClick={() => this.onRequestMatches()}>See Your Matches</button></Link>
        <Link to='/matchesChart' style={{ textDecoration: 'none', color: 'white'  }}><button className='btn btn-dashboard' >Matches Chart</button></Link>
      </div>
    )
  }
}



const mapState = state => {
  if(state.user){
    return {
      userId: state.user.uid
    }
  }
  else return {}
}

export default connect(mapState)(Dashboard)
