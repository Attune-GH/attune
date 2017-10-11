import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Iframe from 'react-iframe'
import firebase from 'APP/fire'
import { getRecentSongs, getUserProfile, getUserBio, setUserBio, getFollowing } from 'APP/fire/refs'
import TextField from 'material-ui/TextField'
import store, { constantlyUpdateUser } from '../store'
import RaisedButton from 'material-ui/RaisedButton'

const auth = firebase.auth()

const style = {
  margin: 12,
  width: 130,
}

const editStyle = {
  margin: 12,
  width: 325,
}

class UserProfile extends Component {
  constructor(props) {
    super()
    this.state = {
      recentSongs: [],
      user: {},
      bio: '',
      isEditing: false,
      following: ''
    }
    this.renderAuthUser = this.renderAuthUser.bind(this)
    this.renderUser = this.renderUser.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.writeBio = this.writeBio.bind(this)
    this.submitBio = this.submitBio.bind(this)
    this.getAge = this.getAge.bind(this)
  }

  componentDidMount() {
    store.dispatch(constantlyUpdateUser())
    let currentAuthUser
    auth.currentUser && (currentAuthUser = firebase.auth().currentUser.uid)
    const uid = this.props.match.params.userId
    getRecentSongs(uid).then(recentSongs => this.setState({ recentSongs }))
    getUserProfile(uid).then(user => this.setState({ user }))
    getUserBio(uid).then(bio => this.setState({ bio }))
    getFollowing(currentAuthUser).then(following =>
      this.setState({ following }))
    firebase.database().ref(`Users/${currentAuthUser}/following/`).on("child_added", () => {
      getFollowing(currentAuthUser).then(following => this.setState({ following }))
    })
    firebase.database().ref(`Users/${currentAuthUser}/following/`).on("child_removed", () => {
      getFollowing(currentAuthUser).then(following => this.setState({ following }))
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.uid !== nextProps.user.uid) {
      getFollowing(nextProps.user.uid).then(following => this.setState({ following }));
      firebase.database().ref(`Users/${nextProps.user.uid}/following/`).on("child_added", () => {
        getFollowing(nextProps.user.uid).then(following => this.setState({ following }))
      })
      firebase.database().ref(`Users/${nextProps.user.uid}/following/`).on("child_removed", () => {
        getFollowing(nextProps.user.uid).then(following => this.setState({ following }))
      })
    }
  }



  onLogout() {
    auth.signOut()
    location.replace('/login')
  }

  getAge(birthday) {
    const today = new Date()
    const birthDate = new Date(birthday)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  writeBio = (event) => {
    setUserBio(this.state.user.uid, event.target.value)
  }

  submitBio = () => {
    const uid = this.state.user.uid
    getUserProfile(uid).then(user => this.setState({ user }))
    getUserBio(uid).then(bio => this.setState({ bio }))
    this.setState({ isEditing: false })
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
    const recentSongs = this.state.recentSongs.slice(0, 3)
    return (
      <div className="container profile">
        <Image src={user.photoURL} style={{ height: '150px', width: '150px', borderRadius: '150px' }} />
        <h2>Hello, {user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}</h2>
        {
          this.state.isEditing ?
            <div>
              <TextField
                hintText="...like who is your favorite artist?"
                floatingLabelText="Tell us about yourself..."
                multiLine={true}
                rows={2}
                rowsMax={2}
                fullWidth={true}
                onChange={this.writeBio}
              />
              <div style={{ display: "block" }}>
                <RaisedButton label="finish bio" primary={true} style={editStyle}
                  onClick={this.submitBio}
                />
              </div>
            </div> :
            <div style={{ width: '350px' }}>
              {
                this.state.bio.length && this.state.bio ? <p style={{ width: '350px' }}>{this.state.bio}</p> : <p style={{ width: '300px' }}>{`Hey ${user.displayName.split(' ').slice(0, 1) || user.displayName}, maybe you should write a bio!`}</p>}
              <RaisedButton label="edit bio" primary={true} style={editStyle}
                onClick={() => { this.setState({ isEditing: true }) }}
              />
            </div>
        }
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
    const recentSongs = this.state.recentSongs.slice(0, 3)
    const { user } = this.state

    let currentAuthUser
    auth.currentUser && (currentAuthUser = firebase.auth().currentUser.uid)

    let followed = false;
    this.state.following && ((this.props.match.params.userId in this.state.following) ? followed = true : followed = false)


    let followButton = null
    if (followed) {
      followButton = (<RaisedButton label="Unfollow" primary={true} style={style}
        onClick={() => {
          firebase.database().ref(`Users/${currentAuthUser}/following`).child(`${user.uid}`).remove()

        }}
      />)
    } else {
      followButton = (<RaisedButton label="Follow" primary={true} style={style}
        onClick={() => {

          let updateObj = {}
          updateObj[user.uid] = new Date()
          firebase.database().ref(`Users/${currentAuthUser}/following`).update(updateObj)
        }}
      />)
    }

    const age = this.getAge(user.birthdate)

    return (
      <div className="container profile">
        <Image src={user.photoURL} style={{ height: '150px', width: '150px', borderRadius: '150px' }} />
        <div>
          <h2>{user.displayName && (age ? (`${user.displayName.split(' ').slice(0, 1)}, ${age}` || `${user.displayName}, ${age}`) :
            (user.displayName.split(' ').slice(0, 1) || user.displayName))
          }</h2>
        </div>
        {
          this.state.bio && this.state.bio.length ? <p style={{ width: '300px' }}>{this.state.bio}</p> : <p style={{ width: '300px' }}>{`${user.displayName} hasn't written a bio yet!`}</p>
        }
        <div className="container buttons">
          <RaisedButton label="Message" primary={true} style={style}
            onClick={() => this.props.history.push(`/messages/${user.uid}`)}
          />
          {followButton}
        </div>
        <div>
          {user.uid &&
            <button className="btn btn-primary"><a href={user.uid && `https://open.spotify.com/user/${user.uid.split(':').slice(2)}`}>Spotify Profile</a></button>
          }
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
}

const mapState = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapState)(UserProfile))
