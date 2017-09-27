const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
const config = {
  apiKey: 'AIzaSyAqgrRwGVrKLpgxG1GdxwOKHWd-f_uEA8U',
  authDomain: 'attune-d8afe.firebaseapp.com',
  databaseURL: 'https://attune-d8afe.firebaseio.com',
  projectId: 'attune-d8afe',
  storageBucket: '',
  messagingSenderId: '336858110264'

}
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
