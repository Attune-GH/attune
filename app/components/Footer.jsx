import React from 'react'
import { withRouter } from "react-router-dom";
import { Image } from 'react-bootstrap'

//hold for logo and also  a redirect to Dashboard
const Footer = (props) => {
  return (
    <div className="container footer navbar-fixed-bottom">
      <div>
        <Image src={'/img/back.svg'}
          style={{ height: '75px' }}
          onClick={() => props.history.goBack() }
          />
      </div>
      {<div>
        <h3>Dashboard</h3>
      </div>}
      <div>
        <Image src={'/img/forward.svg'}
        style={{ height: '75px' }}
        onClick={() => props.history.goForward() }
        />
      </div>
    </div>
  )
}

export default withRouter(Footer)
