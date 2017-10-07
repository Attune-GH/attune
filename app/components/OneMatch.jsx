import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import store from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserProfile } from 'APP/fire/refs'

class OneMatch extends Component {
  constructor(props) {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const uid = this.props.match[0]
    getUserProfile(uid).then(user => this.setState({ user }))
  }

  render() {
    if (this.state.user.uid) console.log(this.state.user)
    const { user } = this.state
    return (
      <div className="container">
        <Image src={user.photoURL} className="user-img" circle />
        <div>
          <h1>{user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}</h1>
          <h2>{`${Math.ceil(this.props.match[1] * 200)}% match`}</h2>
        </div>
        <button className="btn">View Compatibility</button>
        <div>
          <Link to={`profile/${user.uid}`}>
            <button className="btn">View Profile</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default OneMatch
