'use strict'
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
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
import Footer from './components/Footer'
import store, {constantlyUpdateUser} from './store'
import firebase from 'APP/fire'
import {Provider, connect} from 'react-redux'
const auth = firebase.auth()

class Routes extends Component {
  componentDidMount() {
    store.dispatch(constantlyUpdateUser())
  }


  render() {
    // const {user} = store.getState()
    // if(!user.uid && this.props.location.pathname !== '/' ) {
    //   return (
    //     // <Redirect to="/" />
    //     // <div>haai</div>
    //   )
    // }

    return (
      <div>
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={WhoAmI} />
            <Route exact path='/matchesChart' component={MatchesChart} />
            <Route path='/dashboard' component={Dashboard}/>
            <Route exact path='/messages/:userId' component={(props)=> <Convo auth={auth}/>}/>
            <Route path='/messages' component={AllConversations}/>
            <Route exact path='/matches' component={AllMatches}/>
            <Route path='/profile/:userId' component={UserProfile} />
            <Route path='*' component={NotFound} />
          </Switch>
          </div>
        <Footer />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapState)(Routes))
