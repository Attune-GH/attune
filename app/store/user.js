// import axios from 'axios'
// import history from '../history'
import firebase from 'APP/fire'
const auth = firebase.auth()


/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

/**
 * THUNK CREATORS
 */
export const fetchUser = () => {
  return dispatch => {
    try {
      return auth.onAuthStateChanged(currentUser => {
        dispatch(getUser(currentUser))
      })
    } catch(e) {
      console.error(e)
    }
  }
}
  
    

// export const auth = (email, password, method) =>
//   dispatch =>
//     axios.post(`/auth/${method}`, { email, password })
//       .then(res => {
//         dispatch(getUser(res.data))
//         history.push('/home')
//       })
//       .catch(error =>
//         dispatch(getUser({error})))

// export const logout = () =>
//   dispatch =>
//     axios.post('/auth/logout')
//       .then(res => {
//         dispatch(removeUser())
//         history.push('/login')
//       })
//       .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return state
  }
}