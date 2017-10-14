import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Image } from 'react-bootstrap'
import {connect} from 'react-redux'

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backImg: 'back.svg',
      forwardImg: 'forward.svg',
      homeImg: 'dashboard.svg'
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(img) {
    switch (img) {
      case 'back':
        this.setState({ backImg: 'back-hover.svg' })
        break;
      case 'forward':
        this.setState({ forwardImg: 'forward-hover.svg' })
        break;
      case 'dashboard':
        this.setState({ homeImg: 'dashboard-hover.svg' })
        break;
    }
  }


  handleMouseOut(img) {
    switch (img) {
      case 'back':
        this.setState({ backImg: 'back.svg' })
        break;
      case 'forward':
        this.setState({ forwardImg: 'forward.svg' })
        break;
      case 'dashboard':
        this.setState({ homeImg: 'dashboard.svg' })
        break;
    }
  }

  render() {
    return (
    <div>
      <div className="container footer navbar-fixed-bottom">
        <div>
          <Image src={`/img/${this.state.backImg}`}
            style={{ height: '55px' }}
            onMouseOver={() => this.handleMouseOver('back')}
            onMouseOut={() => this.handleMouseOut('back')}
            onClick={() => this.props.history.goBack()}
          />
        </div>
        <div>
          <Image src={`/img/${this.state.homeImg}`}
            style={{ height: '55px' }}
            onMouseOver={() => this.handleMouseOver('dashboard')}
            onMouseOut={() => this.handleMouseOut('dashboard')}
            onClick={() => this.props.handleToggle()}
          />
        </div>
        <div>
          <Image src={`/img/${this.state.forwardImg}`}
            style={{ height: '55px' }}
            onMouseOver={() => this.handleMouseOver('forward')}
            onMouseOut={() => this.handleMouseOut('forward')}
            onClick={() => this.props.history.goForward()}
          />
        </div>
      </div>
    </div>
    )
  }
}

const mapState = state => {
  if(state.user){
    return {
      userId: state.user.uid
    }
  }
  else return {}
}

export default withRouter(connect(mapState)(Footer))

