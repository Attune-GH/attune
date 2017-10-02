'use strict'

import React from 'react'
import {Route, IndexRedirect, IndexRoute, Link, Redirect} from 'react-router'
import firebase from 'APP/fire'


// const currentUser = firebase.auth().currentUser
// console.log(currentUser)
export default () => <div>

  {/* <h2><Link to={`/profile/${currentUser.uid}`}>Profile</Link></h2> */}

  <h2><Link to='/messages'>Messages</Link></h2>
heya
  <h2><Link to='/matches'>Matches</Link></h2>

</div>

