import React, { Component } from 'react'
import firebase from 'APP/fire'
import { connect } from 'react-redux'
import store from '../store/index'
import { fetchConvoIdThunk } from '../store/convo'
import { getMessagesThunk } from '../store/messages'
import { getUserProfile } from 'APP/fire/refs'
import { withRouter } from 'react-router'
import ChatBubble from 'react-chat-bubble'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class Convo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      enteredMessage: '',
      friendUser: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  componentDidMount() {
    const friendUid = this.props.match.params.userId
    this.props.initializeConvo(this.props.user.uid, friendUid)
    getUserProfile(friendUid).then(friendUser => this.setState({ friendUser }))
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleChange(event) {
    this.setState({
      enteredMessage: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    // Write message to the appropriate Convo Key
    const messageObject = { from: this.props.user.uid, content: this.state.enteredMessage }
    if (messageObject.content.length) firebase.database().ref(`Convos/${this.props.convoId}`).push(messageObject)
    //Listen for updates to Firebase and update the Messages store to trigger re-render
    firebase.database().ref(`Convos/${this.props.convoId}`).on("child_added", () => {
      this.props.dispatchGetMessagesThunk(`${this.props.convoId}`)
    })
    this.setState({ enteredMessage: '' })
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behaviour: 'smooth' });
  }

  render() {
    const { friendUser } = this.state
    const messageArray = Object.entries(this.props.messages)
    const chatty = messageArray && messageArray.map(message => {
      let messageObj = {}
      if (message[1].from === this.props.user.uid) {
        messageObj["type"] = 0; //sender
        messageObj["image"] = this.props.user.photoURL
      } else {
        messageObj["type"] = 1; //receiver
        messageObj["image"] = friendUser.photoURL
      }
      messageObj["text"] = message[1].content
      return messageObj
    })

    return (
      <div className="container">
        <br />
        <div>
          <ChatBubble messages={chatty} />
        </div>
        <div ref={el => { this.el = el; }} style={{marginBottom: '60px'}} />
        <div className="chatty" >
          <form onSubmit={this.handleSubmit}>
            <TextField
              hintText="say hey"
              style={{width: '90%'}}
              fullWidth={true}
              onChange={this.handleChange}
              value={this.state.enteredMessage}
            />
            <br />
            <span>
              <RaisedButton label={`Chat with ${friendUser.displayName && (friendUser.displayName.split(' ').slice(0, 1) || friendUser.displayName)}!`}
              className="btn-chat"
              onClick={this.handleSubmit} />
            </span>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeConvo: function (uid, friendUid) {
      dispatch(fetchConvoIdThunk(uid, friendUid))
    },
    dispatchGetMessagesThunk: function (convoKey) {
      dispatch(getMessagesThunk(convoKey))
    }
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    convoId: state.convo,
    user: state.user
  }
}
export default Convo = withRouter(connect(mapStateToProps, mapDispatchToProps)(Convo))
