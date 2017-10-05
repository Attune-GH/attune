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

        <h2><Link to={`/profile/${this.props.userId}`}>Profile</Link></h2>

        <h2><Link to='/messages'>Messages</Link></h2>

        <h2><Link to='/matches'>Matches</Link></h2>

      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.uid
  }
}

export default connect(mapState)(Dashboard)