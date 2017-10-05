import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import firebase from 'APP/fire'
import {getRecentTracks} from 'APP/fire/refs'

const UserProfile = (props) => {
  const {user} = props
  const recentTracks = getRecentTracks(user.uid)
  console.log(recentTracks)
  return (
    <div className="container">
        <Image src={user.photoURL} className="user-img" circle />
        <div>
          <h1>{user.displayName}</h1>
          </div>
      <button className="btn">message</button>
      <button className="btn">block</button>
      <div>
      <button className="btn btn-primary btn-profile"><a href={`https://open.spotify.com/user/${user.displayName}`}>View Spotify Profile</a></button>
      </div>
      <div>
        <div><h1>Recently Played</h1></div>
        <div>
          {/* <div>{
            tracks.items.map((track) => <div key={track.id}><iframe src={`https://open.spotify.com/embed?uri=${track.track.uri}`} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe></div>)
            }</div> */}
        </div>
      </div>
    </div>
  )
}


const mapState = (state, ownProps) => {
  return {
      user: state.user
  }
}

export default withRouter(connect(mapState)(UserProfile));
