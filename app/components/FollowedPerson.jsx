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
    getUserProfile(uid).then(user => this.setState({ user }))
  }

  render() {

    const { user } = this.state


    return (
      <div style={{maxWidth: 500, margin: '0 auto'}}>
        <ListItem
          primaryText={user && `${user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}`}
          leftAvatar={user && <Avatar src={user.photoURL} />}
          rightIcon={user && <RaisedButton label="Profile" backgroundColor = '#7E57C2' style={style}   containerElement={<Link to={`profile/${user.uid}`}/>}
          />}
        />
      </div>
    )
  }
}



export default withRouter(FollowedPerson)



