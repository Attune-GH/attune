import React from 'react'
import firebase from 'APP/fire'
import { withRouter } from 'react-router'
const auth = firebase.auth()

import Login from './Login'

export const name = user => {
  if (!user) return 'Nobody'
  if (user.isAnonymous) return 'Anonymous'
  return user.displayName || user.email
}

export const WhoAmI = ({user, auth, login}) =>
  <div className="whoami">
    <span className="whoami-user-name">Hello, {name(user)}</span>
    { // If nobody is logged in, or the current user is anonymous,
      (!user || user.isAnonymous)?
      // ...then show signin links...
      <Login auth={auth}/>
      /// ...otherwise, show a logout button.
      : login()
       }
  </div>

class SmartWhoAmI extends React.Component {
  constructor() {
    super()
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    const {auth} = this.props
    this.unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  login() {
    this.props.router.push('/dashboard')
  }

  render() {
    const {user} = this.state || {}
    return <WhoAmI user={user} auth={auth} login={this.login}/>
  }
}

export default withRouter(SmartWhoAmI)

// Logout button
{/* <div> 
  <button className='btn btn-primary' onClick={() => auth.signOut()}>Logout</button>
</div> */}