'use strict'

import React, {Component} from 'react'
import {Route, IndexRedirect, IndexRoute, Link, Redirect} from 'react-router-dom'
import firebase from 'APP/fire'
import store, { fetchUser } from '../store'
import {connect} from 'react-redux'


class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    store.dispatch(fetchUser())
  }

  render() {
    return (
      <div>
      {this.props.userId && <div>

        <h2><Link to={`/profile/${this.props.userId}`}>Profile</Link></h2>

        <h2><Link to='/messages'>Messages</Link></h2>

        <h2><Link to='/matches'>Matches</Link></h2>

      </div>}
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