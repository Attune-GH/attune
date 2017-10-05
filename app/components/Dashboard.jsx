'use strict'

<<<<<<< HEAD
import React, { Component } from 'react'
import {Route, IndexRedirect, IndexRoute, Link, Redirect} from 'react-router'
import { connect } from 'react-redux'
=======
import React from 'react'
import {Route, IndexRedirect, IndexRoute, Link, Redirect} from 'react-router-dom'
>>>>>>> master
import firebase from 'APP/fire'
import store, { fetchUser } from '../store'


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

        <h2><Link to={this.props.userID && `/profile/${this.props.userID}`}>Profile</Link></h2>

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