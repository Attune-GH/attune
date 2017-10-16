import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { getConvoIds, getUserProfile } from 'APP/fire/refs'
import store, { constantlyUpdateUser } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessageLine from './MessageLine'

class Inbox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      convoIds: {},
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.user.uid !== nextProps.user.uid){
      getConvoIds(nextProps.user.uid)
        .then(convoIds => {
          this.setState({convoIds})
        })
    }
  }

  componentDidMount(){
    store.dispatch(constantlyUpdateUser())
    const uid = this.props.user.uid
      getConvoIds(uid)
      .then(convoIds => {
        this.setState({convoIds})
      })
  }


  render(){

    let convoPersons

    this.state.convoIds ? convoPersons = Object.keys(this.state.convoIds) : convoPersons = null

    const shrugMen = "¯\\_(ツ)_/¯"
    
    if(!convoPersons){
      return(
        <div className = "container profile">
          <h3>Looks like you don't have any messages!</h3>
          <h2>{shrugMen}</h2>
        </div>
      )
    }

    return (
      <div style={{overflow: 'hidden'}}>
      <List>
        {convoPersons && convoPersons.map(person => {
          if (person !== "undefined") {
            return (
              <div key = {person}>
                <MessageLine person={person}/>
              </div>
            )}
        })}
      </List>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(Inbox))
