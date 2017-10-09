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
        if (snapshot.hasChild(`${friendUid}`)){
          console.log("snapshot.hasChildthatisfriend", snapshot.hasChild(`${friendUid}`))
          console.log("snapshot.val", snapshot.val())
          const convoKey = snapshot.val()[`${friendUid}`]
          console.log("CONVO KEY", convoKey)
          //get value, 
          dispatch(findConvoId(convoKey));
          dispatch(getMessagesThunk(convoKey))

          //make a query to convos table with the convoid value
        }
        else {
          //create new convoKey and push to me and my friends node
          const newConvoKey = firebase.database().ref().child('Convos').push().key
          console.log("NEW CONVO KEY", newConvoKey)
          //push to both user's convoId nodes
          var updates = {};
          updates[friendUid] = newConvoKey
          console.log("UID!!!!!", uid)
          return firebase.database().ref(`Users/${uid}/ConvoIds`).update(updates)
            .then(()=> {
              console.log("updating friend node")
              var updateFriend = {}
              updateFriend[uid] = newConvoKey
              return firebase.database().ref(`Users/${friendUid}/ConvoIds`).update(updateFriend) 
              // return firebase.database().ref(`Users/${friendUid}/ConvoIds`).update({uid: newConvoKey}) 
            })
            .then(()=> {
              console.log("returning convo key")
              return newConvoKey
            })
            .then((convoKey)=> {
              console.log("in the dispatch")
              dispatch(findConvoId(convoKey))
              //BUG IS HERE NOT DISPATCHING!!!!
              console.log("!!!!!!IM RIGHT BEFORE UR BUG!!!!!!")
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