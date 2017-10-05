import firebase from 'APP/fire'
import getMessagesThunk from './messages'

const UsersRef = firebase.database().ref(`/Users`)

//ACTION TYPES
const FIND_CONVO_ID = 'FIND_CONVO_ID'

//ACTION CREATOR
const findConvoId = convoId => ({type: FIND_CONVO_ID, convoId})

//THUNK CREATOR
 export const fetchConvoIdThunk = (uid, friendUid) => {
  console.log("IM A THUNK")

  return dispatch => {
    console.log("DISPATCHED A THING")
    return UsersRef.child(`${uid}/ConvoIds`).once('value')
      .then(snapshot=> {
        console.log("SNAPSHOT!!!!", snapshot)
        if (snapshot.hasChild(`${friendUid}`)){
          console.log("snapshot.val", snapshot.val())
          const convoKey = snapshot.val()
          console.log(convoKey, "convoId")
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
          return firebase.database().ref(`Users/${uid}/ConvoIds`).update({friendUid: newConvoKey})
            .then(()=> {
              console.log("updating friend node")
              return firebase.database().ref(`Users/${friendUid}/ConvoIds`).update({uid: newConvoKey}) 
            })
            .then(()=> {
              console.log("returning convo key")
              return newConvoKey
            })
            .then((convoKey)=> {
              console.log("in the dispatch")
              dispatch(findConvoId(convoKey))
            })
        }
      })
  }




 }



//REDUCER

export default function reducer(convoId = [], action){
  switch(action.type){

    case FIND_CONVO_ID:
      return action.convoId;

    default:
      return convoId
  }
}