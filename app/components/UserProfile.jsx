import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
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
  }

  componentDidMount() {
    const uid = this.props.match.params.userId
    getRecentSongs(uid).then(recentSongs => this.setState({ recentSongs }))
    getUserProfile(uid).then(user => this.setState({ user }))
  }

  render() {
    //this isn't going to work. there will always be a user on props
    // const authUser = this.state.user.uid === this.props.user.uid
    // const {user} = authUser ? this.props : this.state
    const recentSongs = this.state.recentSongs.slice(0, 3)
    if (this.state.user.uid) console.log(this.state.user, 'state')
    // if (this.props.user.uid) console.log(this.props.user, 'props')
    return (
      <div className="container">
        <Image src={user.photoURL} className="user-img" circle />
        <div>
          <h1>{user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}</h1>
        </div>
        <button className="btn" onClick={()=> {window.alert("HAAAY")}}>message</button>
        <button className="btn" onClick={()=> {window.alert("TX  4 UR DATA")}}>block</button>
        <div>
          {/* {this.props.user ? <button className='btn btn-primary' onClick={() => auth.signOut()}>Logout</button> : <button className="btn btn-primary btn-profile"><a href={`https://open.spotify.com/user/${user.displayName}`}>View Spotify Profile</a></button>} */}
          <button className="btn btn-primary btn-profile"><a href={`https://open.spotify.com/user/${user.displayName}`}>View Spotify Profile</a></button>
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
