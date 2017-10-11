import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import store from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserProfile } from 'APP/fire/refs'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'

const style = {
  margin: 15,
}


class FollowedPerson extends Component {
  constructor(props) {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const uid = this.props.person
    console.log('uid', uid)
    getUserProfile(uid).then(user => this.setState({ user }))
  }

  render() {

    const { user } = this.state
    console.log('user in render', this.state.user)

    return (
      <div>
        <ListItem
          primaryText={user && `${user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}`}
          leftAvatar={user && <Avatar src={user.photoURL} />}
          rightIcon={<RaisedButton label="Profile" primary={true} style={style} />}
          />
      </div>
    )
  }
}




export default withRouter(FollowedPerson)

