import React, { Component } from 'react'
import firebase from 'APP/fire'
import { connect } from 'react-redux'
import store from '../store/index'
import { fetchConvoIdThunk } from '../store/convo'
import { getMessagesThunk } from '../store/messages'
import { withRouter } from 'react-router'

class Convo extends Component {
  constructor(props){
    super(props)

    this.state = {
      enteredMessage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.initializeConvo(this.props.user.uid, this.props.match.params.userId)
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
    const messageArray = Object.entries(this.props.messages)

    return(
    <div className = "container">
      <h3> Scintillating Conversation Between Two Interesting People Who Love The Same Music </h3>
        <br/>

        {messageArray && messageArray.map(message=>{
            return (
              <div key={message[0]}>
                <ul>
                <h5>{message[1].from.slice(13)}: {message[1].content}</h5>
                </ul>
              </div>
            )
          }
        )}

        <div >
        <form onSubmit = {this.handleSubmit}>
            <label>{this.props.user.displayName}:</label>
            <input
              className = "formInput"
              name="messageField"
              type="text"
              value = {this.state.enteredMessage}
              placeholder="say hey"
              onChange = {this.handleChange}
            />
        <span className="input-group-btn">
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
