import React, { Component } from 'react'
import firebase from 'APP/fire'
import { connect } from 'react-redux'
import store from '../store/index'
import { fetchConvoIdThunk } from '../store/convo'
import { getMessagesThunk } from '../store/messages'
import { getUserProfile} from 'APP/fire/refs'
import { withRouter } from 'react-router'
import ChatBubble from 'react-chat-bubble'


class Convo extends Component {
  constructor(props){
    super(props)

    this.state = {
      enteredMessage: '', 
      friendUser: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    const friendUid = this.props.match.params.userId
    this.props.initializeConvo(this.props.user.uid, friendUid)
    getUserProfile(friendUid).then(friendUser => this.setState({friendUser}))
  }

  handleChange(event){
    this.setState({
      enteredMessage: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()

    // Write message to the appropriate Convo Key
    const messageObject = {from: this.props.user.uid, content: this.state.enteredMessage}
    firebase.database().ref(`Convos/${this.props.convoId}`).push(messageObject)

    //Listen for updates to Firebase and update the Messages store to trigger re-render
    firebase.database().ref(`Convos/${this.props.convoId}`).on("child_added", ()=> {
      this.props.dispatchGetMessagesThunk(`${this.props.convoId}`)
    })
    this.setState({enteredMessage: ''})
  }

  render(){
    const { friendUser } = this.state
    const messageArray = Object.entries(this.props.messages)
    const chatty = messageArray && messageArray.map(message =>{
      let messageObj = {}
      if(message[1].from === this.props.user.uid) {
        messageObj["type"] = 0; //sender
        messageObj["image"] = this.props.user.photoURL
      } else {
        messageObj["type"] = 1; //receiver
        messageObj["image"] = friendUser.photoURL
      }
      messageObj["text"] = message[1].content
      return messageObj
    })

    return(
    <div className = "container">
      <h4>Your Chat with {friendUser.displayName && (friendUser.displayName.split(' ').slice(0, 1) || friendUser.displayName)}</h4>
      <br/>
      <div className = "messages">
        <ChatBubble messages = {chatty}/>
      </div>
      <div className = "chat">
        <form onSubmit = {this.handleSubmit}>
            <input
              className = "formInput"
              name="messageField"
              type="text"
              value = {this.state.enteredMessage}
              placeholder="say hey"
              onChange = {this.handleChange}
            />
          <br/>
          <span>
            <button
              className="btn btn-default"
              type="submit">
              Chat!
            </button>
          </span>
        </form>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    initializeConvo: function(uid, friendUid){
      dispatch(fetchConvoIdThunk(uid, friendUid))
    },
    dispatchGetMessagesThunk: function(convoKey){
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
