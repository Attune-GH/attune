
import firebase from 'APP/fire'
const db = firebase.database()

exports.getRecentSongs = id => (
  db.ref(`Users/${id}/recentSongs/songs`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

exports.getMatches = id => (
  db.ref(`Users/${id}/matches/matchScores`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

exports.getUserProfile = id => (
  db.ref(`Users/${id}/userProfile/profile`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

