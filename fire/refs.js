import firebase from 'APP/fire'
const db = firebase.database()
const admin = require('firebase-admin')

exports.getRecentTracks = id => ({
  recentTracks: db.ref(`Users/${id}/recentSongs/songs`).once('value').then(snapshot => snapshot.val().songs)
})

exports.getUserProfile = id => ({
  userProfile: admin.auth().getUser(id)
})
