'use strict'
import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import {render} from 'react-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import store from './store'
import {Provider} from 'react-redux'
import Routes from './routes'

import firebase from 'APP/fire'
// Get the auth API from Firebase.
const auth = firebase.auth()
// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
// auth.onAuthStateChanged(user => user || auth.signInAnonymously())

// Further explanation:
//
// Whenever someone signs in or out (that's an "authStateChange"),
// firebase calls our callback with the user. If nobody is signed in,
// firebase calls us with null. Otherwise, we get a user object.
//
// This line of code thus keeps us logged in. If the user isn't signed
// in, we sign them in anonymously. This is useful, because when the user
// is signed in (even anonymously), they'll have a user id which you can
// access with auth.currentUser.uid, and you can use that id to create
// paths where you store their stuff. (Typically you'll put it somewhere
// like /users/${currentUser.uid}).
//
// Note that the user will still be momentarily null, so your components
// must be prepared to deal with that. This is unavoidable—with Firebase,
// the user will always be null for a moment when the app starts, before
// the authentication information is fetched.
//
// If you don't want this behavior, just remove the line above.
render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
)
