'use strict'
import React, {Component} from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import UserProfile from './components/UserProfile'
import Dashboard from './components/Dashboard'
import AllConversations from './components/AllConversations'
import Convo from './components/Convo'
import OneConversation from './components/OneConversation'
import AllMatches from './components/AllMatches'
import MatchesChart from './components/MatchesChart'
import Navbar from './components/Navbar'
import store, {fetchUser} from './store'
import {Provider} from 'react-redux'
import firebase from 'APP/fire'
const auth = firebase.auth()

class Routes extends Component {
  componentDidMount() {
    store.dispatch(fetchUser())
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={WhoAmI} />
            <Route exact path='/matchesChart' component={MatchesChart} />
            <Route path='/dashboard' component={Dashboard}/>
            <Route exact path='/messages/:userId' component={(props)=> <Convo auth={auth}/>}/>
            <Route path='/messages' component={AllConversations}/>
            <Route exact path='/matches' component={AllMatches}/>
            <Route path='/profile/:userId' component={UserProfile} />
            <Route path='*' component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}


export default Routes