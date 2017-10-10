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
    const { user } = this.state
    return (
      <div className="container matches">
        <div>
          <Image src={user.photoURL} style={{ height: '150px', width: '150px', borderRadius: '150px' }} circle />
          <h1>{user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}</h1>
          <h2>{`${Math.ceil(this.props.match[1] * 200)}% match`}</h2>
        </div>
        {/* <button className="btn">View Compatibility</button> */}
        <div>
          <Link to={`profile/${user.uid}`} style={{ color: 'white' }}>
            <button className="btn" style={{ width: '250px' }}>View Profile</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default OneMatch
