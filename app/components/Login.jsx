import React from 'react'
import firebase from 'APP/fire'
import { Image } from 'react-bootstrap'

// const google = new firebase.auth.GoogleAuthProvider()


export default ({ auth }) =>
  (<div className="container profile" >
    <Image
    src={'/img/Attune-11.svg'}
    style={{ height: '270px', margin: '20px 0 40px 0'}} />
    <button className='btn btn-primary'
      onClick={() => location.replace('/login')}>Login with Spotify</button>
  </div>
  )

