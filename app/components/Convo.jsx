import React, { Component } from 'react'
import firebase from 'APP/fire'
import { connect } from 'react-redux'
import store from '../store/index'
const auth = firebase.auth()
import { fetchConvoIdThunk } from '../store/convo'

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
    // const userId = this.state.currentUser.uid

    //Creates a new Convo Key for the convo *IF NO CONVO EXISTS WITH THE USER*
    
      //writes to Users/UserId/ConvoIds to add a record of that conversation
      
       
      // firebase.database().ref(`Users/${userId}/ConvoIds`).push({"BobUID": newConvoKey})

      // var updates = {};
      // updates['/Convos/' + newConvoKey] = {}
      // firebase.database().ref().update(updates)
    
    //Write to Convos table at that Convo Key
    console.log("I HAVE BEEN CLICKED")
    firebase.database().ref(`Convos/${this.props.convoId}`).push({from: this.props.user.uid, content: this.state.enteredMessage})
    firebase.database().ref(`Convos/${this.props.convoId}`).on("child_added", ()=> {
      console.log("SENT A MESSAGE IM IN THE CALLBACK")
      console.log("this.props.messages MEOW!!!!!!", this.props.messages)
    })
    // var updates = {};
    // updates[`Users/${userId}/ConvoIds`] = newConvoKey

  
    // firebase.database().ref().update(updates)
    // firebase.database().ref(`Users/${userId}/ConvoIds`).update(newConvoKey)
    
    // firebase.database().ref('Convos').push({author: this.state.currentUser.uid, content: this.state.enteredMessage})

    // const newPostKey = firebase.database().ref().child('Convos').push().key;
    // // firebase.database().ref(`Convos`).set(this.state.enteredMessage)
    // var updates = {};
    // updates['/Convos/' + newPostKey] = this.state.enteredMessage
    // firebase.database().ref().update(updates)
    this.setState({enteredMessage: ''})
  }

  render(){
    console.log("THE STATE IN HERE", this.state)
    // console.log("this.state.currentUser.uid", this.state.currentUser.uid)
    console.log("THIS PROPS", this.props)

    const messageArray = Object.entries(this.props.messages)

    return(
    <div className = "container">
      <h3> Scintillating Conversation Between Two Interesting People Who Love The Same Music </h3>
        <br/>

        {messageArray.map(message=> {
        {console.log("message1content", message[1].content)}
        {/* <h3>{message[1].content}</h3> */}
        }
        )}

        {this.props.user.displayName}: YOURE SO CHARMING
        <br/>
        {friendUid.slice(13)}: NO YOURE SO CHARMING
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