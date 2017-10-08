import React from 'react'
import firebase from 'APP/fire'
import { Image } from 'react-bootstrap'

// const google = new firebase.auth.GoogleAuthProvider()


export default ({ auth }) =>
  // signInWithPopup will try to open a login popup, and if it's blocked, it'll
  // redirect. If you prefer, you can signInWithRedirect, which always
  // redirects.
  (<div className="container profile" >
    <Image src={'/img/Attune-11.svg'} style={{ height: '200px'}} />
    <button className='btn btn-primary'
      onClick={() => window.open('/login', 'firebaseAuth', 'height=315, width=400')}>Login with Spotify</button>
  </div>
  )
