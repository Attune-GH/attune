import React from 'react'
import firebase from 'APP/fire'
import { withRouter, Redirect } from 'react-router'
import {connect} from 'react-redux'
const auth = firebase.auth()

import Login from './Login'

export const name = user => {
  if (!user) return 'Nobody'
  // if (user.isAnonymous) return 'Anonymous'
  return user.displayName || user.email
}

export const WhoAmI = ({user}) =>
  <div className="whoami">
    <span className="whoami-user-name">Hello, {name(user)}</span>
    { // If nobody is logged in, or the current user is anonymous,
      (!user || user.isAnonymous)?
      // ...then show signin links...
      <Login auth={auth}/>
      /// ...otherwise, show a logout button.
      : <Redirect to="/dashboard"/>
       }
  </div>


const mapState = state => {
  return {
    user: state.user
  }
}



export default connect(mapState)(WhoAmI)

// Logout button
{/* <div>
  <button className='btn btn-primary' onClick={() => auth.signOut()}>Logout</button>
</div> */}
