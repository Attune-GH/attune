import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import firebase from 'APP/fire'
import { getRecentSongs, getUserProfile } from 'APP/fire/refs'
const auth = firebase.auth()

class UserProfile extends Component {
  constructor(props) {
    super()
    this.state = {
      recentSongs: [],
      user: {}
    }
    this.renderAuthUser = this.renderAuthUser.bind(this)
    this.renderUser = this.renderUser.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  componentDidMount() {
    const uid = this.props.match.params.userId
    getRecentSongs(uid).then(recentSongs => this.setState({ recentSongs }))
    getUserProfile(uid).then(user => this.setState({ user }))
  }

  onLogout() {
    auth.signOut()
  }

  render() {
    let authUser
    if (this.state.user.uid) authUser = this.state.user.uid === this.props.user.uid
    return (
      <div>
        {authUser && (authUser) ? this.renderAuthUser() : this.renderUser()}
      </div>
    )
  }

  renderAuthUser() {
    const { user } = this.props
    const recentSongs = this.state.recentSongs.slice(0, 2)
    return (
      <div className="container profile">
        <Image src={user.photoURL} style={{ height: '150px' }} circle />
        <h2>Hello, {user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}</h2>
        <div>
          <button className='btn btn-primary' onClick={() => this.onLogout()}>Logout</button>
        </div>
        <div>
          <div><h2>Recently Played</h2></div>
          <div>
            <div>{
              recentSongs.map((song) => <div key={song.track.id}><iframe src={`https://open.spotify.com/embed?uri=${song.track.uri}`} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe></div>)
            }</div>
          </div>
        </div>
      </div>
    )
  }

  renderUser() {
    const recentSongs = this.state.recentSongs.slice(0, 2)
    const { user } = this.state
    return (
      <div className="container profile">
        <Image src={user.photoURL} style={{ height: '150px' }} circle />
        <div>
          <h1>{user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}</h1>
        </div>
        {/* <button className="btn" onClick={() => { window.alert("HAAAY") }}>message</button> */}
        {/* <button className="btn" onClick={() => { window.alert("TX  4 UR DATA") }}>block</button> */}
        <div>
          {user.uid &&
            <button className="btn btn-primary btn-profile"><a href={user.uid && `https://open.spotify.com/user/${user.uid.split(':').slice(2)}`}>View Spotify Profile</a></button>
          }
        </div>
        <div>
          <div><h1>Recently Played</h1></div>
          <div>
            <div>{
              recentSongs.map((song) => <div key={song.track.id}><iframe src={`https://open.spotify.com/embed?uri=${song.track.uri}`} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe></div>)
            }</div>
          </div>
        </div>
      </div>
    )
  }

}

const mapState = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapState)(UserProfile))
