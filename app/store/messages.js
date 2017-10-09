import firebase from 'APP/fire'

//ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES'
const ADD_MESSAGE = 'ADD_MESSAGE'

//ACTION CREATOR
const getMessages  = allMessages => ({type: GET_MESSAGES, allMessages})
export const addMessage = message => ({type: ADD_MESSAGE, message})

//THUNK CREATOR
export const getMessagesThunk = (convoKey) => {
  return dispatch => {
    console.log("IM IN A THUNK!!!!!")
    return firebase.database().ref(`Convos/${convoKey}`).once('value')
      .then(snapshot => snapshot.val())
      .then(allMessages => {
        console.log("ALL MESSAGES", allMessages)
        dispatch(getMessages(allMessages))
      })
  }
}
//REDUCER

export default function reducer(messages = [], action){
  switch(action.type){
    case GET_MESSAGES:
      return action.allMessages;

    case ADD_MESSAGE: 
      return Object.assign({}, messages, action.message)
    default: 
      return messages 
  }
}