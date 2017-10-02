'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'

import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import UserProfile from './components/UserProfile'
import Dashboard from './components/Dashboard'
import Entry from './components/Entry'
import AllConversations from './components/AllConversations'
import OneConversation from './components/OneConversation'
import AllMatches from './components/AllMatches'

import firebase from 'APP/fire'


// Get the auth API from Firebase.
const auth = firebase.auth()

console.log(auth.uid)
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
  <Router history={browserHistory}>
    <Route path="/" component={Entry} />
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/messages' component={AllConversations}/>
    <Route path='/messages/:userId' component={OneConversation}/>
    <Route path='/matches' component={AllMatches}/>
    <Route path='/profile/:userId' component={UserProfile} />
    <Route path='*' component={NotFound}/>
  </Router>,
  document.getElementById('main')
)
