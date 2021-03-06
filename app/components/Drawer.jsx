import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import firebase from 'APP/fire'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'

class DashboardDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.onRequestMatches = this.onRequestMatches.bind(this)
  }

  onRequestMatches() {
    firebase.database().ref(`Users/${this.props.userId}/requestMatches`).update({
      lastMatchRefreshRequested: new Date()
    });
  }

  render() {
    return (
      <div >
        <Drawer
          docked={false}
          width={300}
          open={this.props.open}
          swipeAreaWidth={70}
          onRequestChange={this.props.handleToggle}
          containerStyle={{ paddingTop: '100px' }}>

          <Link to={`/profile/${this.props.userId}`} style={{ textDecoration: 'none' }}>
            <RaisedButton
              style={{ padding: '20px' }} onClick={() => this.props.handleClose()} backgroundColor='#7E57C2' fullWidth={true}>
              Profile</RaisedButton></Link>
          <Link to='/matches' style={{ textDecoration: 'none', color: 'white' }}>
            <RaisedButton
              style={{ padding: '20px' }} backgroundColor='#7E57C2' fullWidth={true}
              onClick={() => {
                this.onRequestMatches()
                this.props.handleClose()
              }}>
              See Your Matches</RaisedButton></Link>
          <Link to='/messages' style={{ textDecoration: 'none', color: 'white' }}>
            <RaisedButton
              style={{ padding: '20px' }}
              onClick={() => this.props.handleClose()} backgroundColor='#7E57C2' fullWidth={true}>
              Messages Inbox</RaisedButton></Link>
            <Link to='/matchesChart' style={{ textDecoration: 'none', color: 'white' }}>
              <RaisedButton
                style={{ padding: '20px' }}
                onClick={() => this.props.handleClose()} backgroundColor='#7E57C2' fullWidth={true}>
                Matches Chart</RaisedButton></Link>
            <Link to='/following' style={{ textDecoration: 'none', color: 'white' }}>
              <RaisedButton
                style={{ padding: '20px' }}
                onClick={() => this.props.handleClose()} backgroundColor='#7E57C2' fullWidth={true}>
                Following</RaisedButton></Link>

        </Drawer>
      </div>
    )
  }

}

const mapState = state => {
  if (state.user) {
    return {
      userId: state.user.uid
    }
  }
  else return {}
}

export default connect(mapState)(DashboardDrawer)
