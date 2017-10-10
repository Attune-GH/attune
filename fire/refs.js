
import firebase from 'APP/fire'
const db = firebase.database()

exports.getRecentSongs = id => (
  db.ref(`Users/${id}/recentSongs/songs`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

exports.getMatches = id => (
  db.ref(`Users/${id}/matches/matchScores`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

exports.getFollowing = id => (
  db.ref(`Users/${id}/following/`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

exports.getUserProfile = id => (
  db.ref(`Users/${id}/userProfile`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

exports.getAllMatches = id => (
  db.ref(`Users/${id}/matches`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

exports.getUserBio = (id) => (
  db.ref(`Users/${id}/bio`).once('value').then(snapshot => snapshot.val()).catch(console.error)
)

exports.setUserBio = (id, bio) => (
  db.ref(`Users/${id}/`).update({ bio: bio })
)

