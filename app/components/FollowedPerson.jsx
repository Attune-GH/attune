import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import store from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserProfile } from 'APP/fire/refs'
import {List, ListItem} from 'material-ui/List';

class FollowedPerson extends Component {
  constructor(props) {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const uid = this.props.person
    console.log('uid', uid)
    getUserProfile(uid).then(user => this.setState({user}))
  }




  render() {

    const { user } = this.state
    console.log('user in render', this.state.user)

    return (
    <div className="container matches">
     <ListItem
        primaryText= {user && <h3 style={{textAlign: 'center', margin: '3px'}}>{user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}</h3>}
        leftAvatar={user && <Image src={user.photoURL} style={{ height: '40px', margin: "0 auto"}} circle /> }
        rightIcon= {user && <Link to={`profile/${user.uid}`} style={{ color: 'white' }}>
            <button style={{boxShadow: 'none', border: 'none'}}>View Profile</button>
          </Link>}
      />
    </div>
    )
  }
}



export default FollowedPerson
