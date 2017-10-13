import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { getConvoIds, getUserProfile } from 'APP/fire/refs'
import store, { constantlyUpdateUser } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import MessageLine from './MessageLine'
import DashboardDrawer from './Drawer'

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

    let convoArray

    this.state.convoIds ? convoArray = Object.entries(this.state.convoIds) : convoArray = null
    // const convoArray = Object.entries(this.state.convoIds)

    return (
      <div style={{overflow: 'hidden'}}>
      <DashboardDrawer/>
      <List>
        {convoArray.length && convoArray.map(convo => {
          if (convo[0]!== "undefined") {
            return (
              <div key = {convo[1]}>
                <MessageLine convo={convo[0]}/>
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
