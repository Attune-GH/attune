'use strict'

import React from 'react'
import {Route, IndexRedirect, IndexRoute, NavLink, Redirect} from 'react-router'
import firebase from 'APP/fire'


// const currentUser = firebase.auth().currentUser
// console.log(currentUser)
export default () => <div>

  {/* <h2><Link to={`/profile/${currentUser.uid}`}>Profile</Link></h2> */}

  <h2><NavLink to='/messages'>Messages</NavLink></h2>

  {/* <h2><NavLink to='/matches'>Matches</NavLink></h2> */}

</div>

