'use strict'

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
    return (
      <div className="dashboard">
        <button className="btn btn-dashboard"><Link to={`/profile/${this.props.userId}`}style={{ textDecoration: 'none', color: 'white' }}
        >Profile</Link></button>
        <button className="btn btn-dashboard"><Link to='/messages' style={{ textDecoration: 'none', color: 'white'  }}>Messages</Link></button>
        <button className="btn btn-dashboard"><Link to='/matches' style={{ textDecoration: 'none', color: 'white'  }}>Matches</Link></button>
        <button className='btn btn-dashboard' onClick={() => this.onRequestMatches()}>Get New Matches</button>
      </div>
    )
  }
}



const mapState = state => {
  return {
    userId: state.user.uid
  }
}

export default connect(mapState)(Dashboard)
