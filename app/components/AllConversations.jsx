import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import { getConvoIds, getUserProfile } from 'APP/fire/refs'
import store, { constantlyUpdateUser } from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const img = 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAfRAAAAJGY5YjFhN2Q2LTUyNjMtNDQ4OS04Mzk5LTcyMGQyM2E0MTgwOA.jpg'

class Inbox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      convoIds: {},
      convoUsers: {}
    }
  }


  componentWillReceiveProps(nextProps){
    if (this.props.user.uid !== nextProps.user.uid){
      getConvoIds(nextProps.user.uid)
        .then(convoIds => {
          this.setState({convoIds})
          //for each convoid, get the user object
          let convoIdKeys = Object.keys(convoIds)
          let convoUsers = {}
          convoIdKeys.forEach((convoIdKey)=> {
            getUserProfile(convoIdKey)
            .then(userProfile => {
              convoUsers[convoIdKey] = userProfile
              // convoUsers.push(userProfile)
            })
          })
          this.setState({convoUsers})
        })
    }
  }

  componentDidMount(){
    store.dispatch(constantlyUpdateUser())
    const uid = this.props.user.uid 

      getConvoIds(uid)
      .then(convoIds => {
        this.setState({convoIds})
        let convoIdKeys = Object.keys(convoIds)
        let convoUsers = {}
        let promiseArr = []

        convoIdKeys.forEach(convoIdKey => {
          promiseArr.push(getUserProfile(convoIdKey))
        })

        Promise.all(promiseArr)
        .then(profiles => {
          profiles.forEach((userProfile, i) => {
            let profileId = convoIdKeys[i]
            convoUsers[profileId] = userProfile
          })
          console.log('new convo users?', convoUsers)
          return convoUsers
        })
        .then(convoUsers => this.setState({convoUsers}))
        .catch(console.error)

      })
  }


  render(){
    const convoArray = Object.entries(this.state.convoIds)
    const { convoUsers } = this.state;

    console.log("CONVO USERS????", convoUsers)

    return (
    <div className = "container">
      <List>
      {/* <Subheader>Recent chats</Subheader> */}
        {(convoUsers && convoArray.length) && convoArray.map(convo => {
          if (convo[0]!== "undefined") {
            return (
            <ListItem key = {convo[1]}
            /* primaryText = {convo[0]} */
            primaryText={convoUsers[convo[0]].displayName}
            leftAvatar={<Avatar src={img} />}
            rightIcon={<CommunicationChatBubble />}
            onClick={()=> this.props.history.push(`/messages/${convo[0]}`)}
            />
            ) 
          }
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


// export default() => (
//   <div>
//     {console.log("GET CONVO IDS!", getConvoIds())}
//     <List>
//       <Subheader>Recent chats</Subheader>
//       <ListItem
//         primaryText="Brendan Lim"
//         leftAvatar={<Avatar src={img} />}
//         rightIcon={<CommunicationChatBubble />}
//       />
//       <ListItem
//         primaryText="Eric Hoffman"
//         leftAvatar={<Avatar src={img} />}
//         rightIcon={<CommunicationChatBubble />}
//       />
//       <ListItem
//         primaryText="Grace Ng"
//         leftAvatar={<Avatar src={img} />}
//         rightIcon={<CommunicationChatBubble />}
//       />
//       <ListItem
//         primaryText="Kerem Suer"
//         leftAvatar={<Avatar src={img}/>}
//         rightIcon={<CommunicationChatBubble />}
//       />
//       <ListItem
//         primaryText="Raquel Parrado"
//         leftAvatar={<Avatar src={img}/>}
//         rightIcon={<CommunicationChatBubble />}
//       />
//     </List>
//   </div>
// );
