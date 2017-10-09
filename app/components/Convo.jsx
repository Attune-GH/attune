import React, { Component } from 'react'
import firebase from 'APP/fire'
import { connect } from 'react-redux'
import store from '../store/index'
const auth = firebase.auth()
import { fetchConvoIdThunk } from '../store/convo'
import { getMessagesThunk } from '../store/messages'
import { withRouter } from 'react-router'
// let friendUid = "spotify:user:jpvelez"

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

  componentDidMount(){
    console.log("IM MOUNTING!!!! RN!!!!!")
    this.props.initializeConvo(this.props.user.uid, this.props.match.params.userId)
  }

  // componentWillReceiveProps(nextProps){
  //   console.log("THIS.PROPS.USER.UID", this.props.user.uid)
  //   console.log("NEXTPROPS.USER.UID", nextProps.user.uid)

  //   // this.unsubscribe = auth.onAuthStateChanged(currentUser => this.setState({currentUser}));  
  //   //FOR NOW, FRIEND UID IS ALWAYS JUAN. WILL PASS IN AS PROPS SOMEHOW L8R
  //   if(this.props.user.uid !== nextProps.user.uid){
  //     this.props.initializeConvo(nextProps.user.uid, friendUid)
  //   }
  // }

  // componentWillUnmount() {
  //   this.unsubscribe()
  // }

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

    firebase.database().ref(`Convos/${this.props.convoId}`).on("child_added", ()=> {
      this.props.dispatchGetMessagesThunk(`${this.props.convoId}`)
    })
    this.setState({enteredMessage: ''})
  }

  render(){
    console.log("THEESE PROPSZ", this.props)
    const messageArray = Object.entries(this.props.messages)

    return(
    <div className = "container">
      <h3> Scintillating Conversation Between Two Interesting People Who Love The Same Music </h3>
        <br/>

        {messageArray && messageArray.map(message=>{
          console.log("MESSSSSAGE", message)
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
              placeholder="say something friendly"
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