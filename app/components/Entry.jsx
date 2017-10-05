import React from 'react'
import WhoAmI from './WhoAmI'
import firebase from 'APP/fire'


const auth = firebase.auth()


const App = ({children}) =>
<div>
    {/* WhoAmI takes a firebase auth API and renders either a
        greeting and a logout button, or sign in buttons, depending
        on if anyone's logged in */}
    <WhoAmI auth={auth}/>
  {/* Render our children (whatever the router gives us) */}

</div>

export default App
