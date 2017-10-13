import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { getFollowing } from 'APP/fire/refs'
import FollowedPerson from './FollowedPerson'
import firebase from 'APP/fire'
import { withRouter } from 'react-router'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import { connect } from 'react-redux'
import store, { constantlyUpdateUser } from '../store'


  class Following extends React.Component {

    constructor(props) {
      super()
      this.state = {
        following: []
      }
    }


    componentWillReceiveProps(nextProps) {
      if (this.props.user.uid !== nextProps.user.uid) {
      getFollowing(nextProps.user.uid).then(following =>
      this.setState({following}))
    }
  }


    componentDidMount() {
      store.dispatch(constantlyUpdateUser())
      const uid = this.props.user.uid
      getFollowing(this.props.user.uid).then(following =>
      this.setState({following}))

    }

    render() {

      let followedPersons

      this.state.following ? followedPersons = Object.keys(this.state.following) : followedPersons = null

      return (
        <div>
          <div style={{overflow: 'hidden'}}>
            {/* <h1  style={{textAlign: 'center'}}>Following</h1> */}
            <List>
            {followedPersons && followedPersons.map(person => {
              return <div key={person}><FollowedPerson person={person}/></div>
            })}
            </List>
          </div>
        </div>
      )

    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

  export default withRouter(connect(mapStateToProps)(Following))
