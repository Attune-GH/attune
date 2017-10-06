import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import store from '../store'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

//assuming we are passing in this match as props
const OneMatch = props  => {

  return (
    <div className="container">
      <Image src={props.match.images[0].url} className="user-img" circle />
      <div>
          <h1>{props.match.display_name.split(' ').slice(0, 1).join('') || props.match.uid}</h1>
      </div>
      <button className="btn">View Compatibility</button>
      <div>
        <Link to={`profile/${props.match.uid}`}>
          <button className="btn">View Profile</button>
        </Link>
      </div>
    </div>
    )
}

const mapStateToProps = (state) => {

}

export default withRouter(connect(mapStateToProps)(OneMatch));
