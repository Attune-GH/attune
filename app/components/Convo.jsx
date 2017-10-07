import React, { Component } from 'react'
import firebase from 'APP/fire'
import { connect } from 'react-redux'
import store from '../store/index'
const auth = firebase.auth()
import { fetchConvoIdThunk } from '../store/convo'
import { addMessage } from '../store/messages'
let friendUid = "spotify:user:jpvelez"

class Convo extends Component {
  constructor(props){
    super(props)

    this.state = {
      // currentUser: {},
      enteredMessage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps){
    // this.unsubscribe = auth.onAuthStateChanged(currentUser => this.setState({currentUser}));  

    //FOR NOW, FRIEND UID IS ALWAYS JUAN. WILL PASS IN AS PROPS SOMEHOW L8R
    if(this.props.user.uid !== nextProps.user.uid){
      this.props.initializeConvo(nextProps.user.uid, friendUid)
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange(event){
    this.setState({
      enteredMessage: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()

    
    //Write to Convos table at that Convo Key
    const messageObject = {from: this.props.user.uid, content: this.state.enteredMessage}

    // firebase.database().ref(`Convos/${this.props.convoId}`).push(messageObject)
    const messageKey = firebase.database().ref(`Convos/${this.props.convoId}`).push(messageObject).key
    console.log("MESSAGE KEY!", messageKey)

    firebase.database().ref(`Convos/${this.props.convoId}`).on("child_added", ()=> {
      this.props.dispatchAddMessage({messageObject})
    })
      
    
    // this.setState({enteredMessage: ''})
  }

  render(){
    if(this.props.messages) {
      const messageArray = Object.entries(this.props.messages)
        {messageArray && messageArray.map(message=>{
          
            return 
              <div>
                <h2>{message[1].from}: </h2>
                <h3>{message[1].content}</h3>
                <br/>
              </div>
            }
          )}
    }

    return(
    <div className = "container">
      <h3> Scintillating Conversation Between Two Interesting People Who Love The Same Music </h3>
        <br/>
        
  
        <div >
        <form onSubmit = {this.handleSubmit}>
            <label>{this.props.user.displayName}:</label> 
            <input
              className = "formInput"
              name="messageField"
              type="text"
              value = {this.state.enteredMessage}
              placeholder="friendly message"
              onChange = {this.handleChange}
            />
            <input
              type="submit"
              name="submit"
            />
            
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
    dispatchAddMessage: function(message){
      dispatch(addMessage(message))
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
export default Convo = connect(mapStateToProps, mapDispatchToProps)(Convo)