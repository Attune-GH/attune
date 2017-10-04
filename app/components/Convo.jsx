import React, { Component } from 'react'
import firebase from 'APP/fire'
const auth = firebase.auth()

export default class Convo extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentUser: {},
      enteredMessage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    const {auth} = this.props
    this.unsubscribe = auth.onAuthStateChanged(currentUser => this.setState({currentUser}));  
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
    const userId = this.state.currentUser.uid

    //Creates a new Convo Key for the convo
    const newConvoKey = firebase.database().ref().child('Convos').push().key
      // var updates = {};
      // updates['/Convos/' + newConvoKey] = {}
      // firebase.database().ref().update(updates)
    
    //Write to Convos table at that Convo Key
    firebase.database().ref('Convos/' + newConvoKey).push({author: this.state.currentUser.uid, content: this.state.enteredMessage})
    
    var updates = {};
    updates[`Users/${userId}/ConvoIds`] = newConvoKey
    firebase.database().ref(`Users/${userId}/ConvoIds`).push(newConvoKey)
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
    console.log("this.state.currentUser.uid", this.state.currentUser.uid)
    
    return(
    <div className = "container">
      <h3> Scintillating Conversation Between Two Interesting People Who Love The Same Music </h3>
        <br/>
        {this.state.currentUser.displayName}: YOURE SO CHARMING
        <br/>
        Bob: NO YOURE SO CHARMING
        <div >
        <form onSubmit = {this.handleSubmit}>
            <label>{this.state.currentUser.displayName}:</label> 
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




