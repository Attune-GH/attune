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


const img = 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAfRAAAAJGY5YjFhN2Q2LTUyNjMtNDQ4OS04Mzk5LTcyMGQyM2E0MTgwOA.jpg'



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

      let followedPersons = Object.keys(this.state.following)

      return (
        <div style={{textAlign: 'center', margin: '0 auto'}}>
          <h3>Users You're Following</h3>
          <List style ={{}} >
          {followedPersons.length && followedPersons.map(person => {
            return <div key={person}><FollowedPerson person={person}/></div>
          })}
          </List>
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
