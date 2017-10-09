import React from 'react'
import firebase from 'APP/fire'


// const google = new firebase.auth.GoogleAuthProvider()


export default ({ auth }) =>
  // signInWithPopup will try to open a login popup, and if it's blocked, it'll
  // redirect. If you prefer, you can signInWithRedirect, which always
  // redirects.
  <button className='btn btn-primary'
          onClick={() => location.replace('/login')}>Login with Spotify</button>
