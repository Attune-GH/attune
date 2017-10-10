import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { getMatches } from 'APP/fire/refs'
import firebase from 'APP/fire'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const img = 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAfRAAAAJGY5YjFhN2Q2LTUyNjMtNDQ4OS04Mzk5LTcyMGQyM2E0MTgwOA.jpg'

mport store, { constantlyUpdateUser } from '../store'

  class SimpleSlider extends React.Component {

    constructor(props) {
      super()
      this.state = {
        matches: []
      }
    }


    componentWillReceiveProps(nextProps) {
      if (this.props.user.uid !== nextProps.user.uid) {
      getFollowing(nextProps.user.uid).then(matches =>
      this.setState({matches}))
    }
    }


  componentDidMount() {
      store.dispatch(constantlyUpdateUser())
      const uid = this.props.user.uid
      firebase.database().ref(`Users/${uid}/matches/matchScores`).on("child_added", ()=> {
          getMatches(uid).then(matches => this.setState({ matches }))
      })
    }

  render() {

    <div>
      <List>
        <Subheader>Following</Subheader>
        <ListItem
          primaryText="Brendan Lim"
          leftAvatar={<Avatar src={img} />}
          rightIcon={<CommunicationChatBubble />}
        />
      </List>
    </div>

  }
