import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import store from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserProfile } from 'APP/fire/refs'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Avatar from 'material-ui/Avatar'

const style = {
  margin: 15,
}

class MessageLine extends Component {
  constructor(props){
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    const uid = this.props.convo
    getUserProfile(uid).then(user => this.setState({ user }))
  }

  render(){
    const { user } = this.state

    return (
      <div style={{maxWidth: 500, margin: '0 auto', overflow: 'hidden'}}>
        <ListItem
          primaryText={user && `${user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}`}
          leftAvatar={user && <Avatar src={user.photoURL} />}
          rightIcon= {<CommunicationChatBubble/>}
          onClick={()=> this.props.history.push(`/messages/${user.uid}`)}
          />
      </div>
    )
  }
}

export default withRouter(MessageLine)
