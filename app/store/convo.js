import firebase from 'APP/fire'
import { getMessagesThunk, getMessages } from './messages'

const UsersRef = firebase.database().ref(`/Users`)

//ACTION TYPES
const FIND_CONVO_ID = 'FIND_CONVO_ID'

//ACTION CREATOR
const findConvoId = convoId => ({type: FIND_CONVO_ID, convoId})

//THUNK CREATOR 
 export const fetchConvoIdThunk = (uid, friendUid) => {
  return dispatch => {
    return UsersRef.child(`${uid}/ConvoIds`).once('value')
      .then(snapshot=> {
        if(snapshot.hasChild(`${friendUid}`)){
          const convoKey = snapshot.val()[`${friendUid}`]
          dispatch(findConvoId(convoKey));
          dispatch(getMessagesThunk(convoKey))
        }
        else {
          const newConvoKey = firebase.database().ref().child('Convos').push().key
          var updates = {}
          updates[friendUid] = newConvoKey
          return firebase.database().ref(`Users/${uid}/ConvoIds`).update(updates)
            .then(()=> {
              var updateFriend = {}
              updateFriend[uid] = newConvoKey
              return firebase.database().ref(`Users/${friendUid}/ConvoIds`).update(updateFriend) 
            })
            .then(()=> {
              return newConvoKey
            })
            .then((convoKey)=> {
              dispatch(findConvoId(convoKey))
              dispatch(getMessages({}))
            })
        }
      })
  }
 }

//REDUCER
export default function reducer(convoId = '', action){
  switch(action.type){
    case FIND_CONVO_ID:
      return action.convoId;

    default:
      return convoId
  }
}