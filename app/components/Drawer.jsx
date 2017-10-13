import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import firebase from 'APP/fire'
import {connect} from 'react-redux'

// const buttonStyle = {
//   backgroundColor: '#7E57C2'
// }

class DashboardDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {open: false}

    this.onRequestMatches = this.onRequestMatches.bind(this)
  }

  handleToggle = ()=> this.setState({open: !this.state.open});
  handleClose = ()=> this.setState({open: false});

  onRequestMatches() {
    firebase.database().ref(`Users/${this.props.userId}/requestMatches`).update({
      lastMatchRefreshRequested: new Date()
    });
  }

  render(){
    return (
      <div >
        <RaisedButton
          label = "DASHBOARD"
          onClick={this.handleToggle}
        />
        <Drawer
          docked= {false}
          width={300}
          open={this.state.open}
          onRequestChange={(open)=> this.setState({open})}
          containerStyle = {{paddingTop: '150px'}}
        >
          <MenuItem>
            <Link to={`/profile/${this.props.userId}`}style={{ textDecoration: 'none', color: 'white' }}>
            <RaisedButton primary = {true}  fullWidth = {true}>
              Profile</RaisedButton></Link>
          </MenuItem>
          <MenuItem>
            <Link to='/matches' style={{ textDecoration: 'none', color: 'white'  }}>
            <RaisedButton primary = {true} fullWidth = {true} onClick={() => this.onRequestMatches()}>
              See Your Matches</RaisedButton></Link>
          </MenuItem>
          <MenuItem>
            <Link to='/messages' style={{ textDecoration: 'none', color: 'white'  }}>
            <RaisedButton primary = {true} fullWidth = {true}>
              Messages Inbox</RaisedButton></Link>
          </MenuItem>
          <MenuItem>
            <Link to='/matchesChart' style={{ textDecoration: 'none', color: 'white'  }}>
            <RaisedButton primary = {true} fullWidth = {true}> 
              Matches Chart</RaisedButton></Link>
          </MenuItem>
          <MenuItem>
            <Link to='/following' style={{ textDecoration: 'none', color: 'white'  }}>
            <RaisedButton primary = {true} fullWidth = {true}>
              Following</RaisedButton></Link>
          </MenuItem>
        </Drawer>
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

export default connect(mapState)(DashboardDrawer)