'use strict'

import React from 'react'
import {Route, IndexRedirect, IndexRoute, Link, Redirect} from 'react-router-dom'
import firebase from 'APP/fire'


export default () => <div>

  <h2><Link to={`/profile/:userId`}>Profile</Link></h2>

  <h2><Link to='/messages'>Messages</Link></h2>

  <h2><Link to='/matches'>Matches</Link></h2>

</div>

