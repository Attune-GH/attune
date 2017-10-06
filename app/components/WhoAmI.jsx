import React from 'react'
import firebase from 'APP/fire'
import { withRouter, Redirect } from 'react-router'
import {connect} from 'react-redux'
const auth = firebase.auth()

import Login from './Login'

export const name = user => {
  if (!user) return 'Nobody'
  return user.displayName || user.email
}

export const WhoAmI = ({user}) => {
  console.log('user', user)
  return (
    <div className="whoami">
      <span className="whoami-user-name">Hello, {name(user)}</span>
      { // If nobody is logged in
        (!user.uid)?
        // ...then show signin links...
        <Login auth={auth}/>
        /// ...otherwise, show a logout button.
        :
        <Redirect to="/dashboard"/>
        }
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(WhoAmI)
