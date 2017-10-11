import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import store from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserProfile } from 'APP/fire/refs'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  margin: 12,
  width: 130,
}

class OneMatch extends Component {
  constructor(props) {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const uid = this.props.match[0]
    getUserProfile(uid).then(user => this.setState({ user }))
  }




  render() {

    const { user } = this.state
    let matchGrade
    if (this.props.match[1] >= 0.06) matchGrade = 'High Compatibility';
    if (this.props.match[1] >= 0.04 && this.props.match[1] < 0.06) matchGrade = 'Medium Compatibility';
    if (this.props.match[1] >= 0.02 && this.props.match[1] < 0.04) matchGrade = 'OK Compatibility'

    return (
      <div className="container matches">
        <div>
          {user && <Image src={user.photoURL} style={{ height: '150px', width: '150 px', borderRadius: '150px', margin: "0 auto"}} /> }
          {user && <h1 style={{textAlign: 'center', margin: '3px'}}>{user.displayName && (user.displayName.split(' ').slice(0, 1) || user.displayName)}</h1>}
          <div style={{display: 'flex', justifyContent: 'center', margin: '0px'}}>
          <h3 style={{textAlign: 'center', borderStyle: 'solid', padding: '10px'}}>{matchGrade}</h3>
          </div>
          <h3 style={{textAlign: 'center'}}>{`${Math.ceil(this.props.match[1] * 200)}% overlap in your listening history`}</h3>
        </div>
        {/* {<button className="btn btn-match">Compatibility</button>} */}
        <div>
          {/* {user && <Link to={`profile/${user.uid}`} style={{ color: 'white' }}>
            <button className="btn btn-match" style={{ width: '250px' }}>View Profile</button>
          </Link>} */}
                    <div className="container buttons">
          <RaisedButton label="Compatibility" primary={true} style={style} />
          <RaisedButton label="Profile" primary={true} style={style} />
          </div>
        </div>
      </div>
    )
  }
}

export default OneMatch
