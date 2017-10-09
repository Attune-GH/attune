import firebase from 'APP/fire'

//ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES'

//ACTION CREATOR
export const getMessages  = allMessages => ({type: GET_MESSAGES, allMessages})

//THUNK CREATOR
export const getMessagesThunk = (convoKey) => {
  return dispatch => {
    console.log("IM IN A THUNK!!!!!")
    return firebase.database().ref(`Convos/${convoKey}`).once('value')
      .then(snapshot => snapshot.val())
      .then(allMessages => {
        console.log("ALL MESSAGES", allMessages)
        if (allMessages){
          dispatch(getMessages(allMessages))
        } else {
          dispatch(getMessages({}))
        }
      })
  }
}
//REDUCER

export default function reducer(messages = {}, action){
  console.log("IN THE REDUCCER!!!!!!!!!!!!!!", messages)

  switch(action.type){
    case GET_MESSAGES:
      return action.allMessages;

    default: 
      return messages 
  }
}