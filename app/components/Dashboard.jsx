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
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout() {
    auth.signOut()
    .then(() => this.props.history.push('/'))
  }


  render() {
    return (
    <div>
      {this.props.userId && 
      <div>
        <h2><Link to={`/profile/${this.props.userId}`}>Profile</Link></h2>

        <h2><Link to='/messages'>Messages</Link></h2>

        <h2><Link to='/matches'>Matches</Link></h2>

        {/* Logout button, temporary placement */}
        <div>
          <button className='btn btn-primary' onClick={() => this.onLogout()}>Logout</button>
        </div>
      </div>
      }
    </div>
    )
  }
}

const mapState = state => {
  console.log("IM IN A STATE", state)
  if(state.user){
    return {
      userId: state.user.uid
    }
  }
  else return {}
}

export default connect(mapState)(Dashboard)
