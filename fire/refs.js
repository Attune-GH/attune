import firebase from 'APP/fire'
const db = firebase.database()
// const admin = require('firebase-admin')

exports.getRecentSongs = id => (
  db.ref(`Users/${id}/recentSongs/songs`).once('value').then(snapshot => snapshot.val())
)

exports.getMatches = id => (
  db.ref(`Users/${id}/matches/matchScores`).once('value').then(snapshot => snapshot.val())
)

// exports.getUserProfile = id => (
//   admin.auth().getUser(id)
//   .then(user => user)
// )
