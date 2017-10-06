var functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const genreSimScore = require('./genres');
const recentSongsSimScore = require('./recentTracks');
const topArtistsSimScore = require('./topArtists');
const topTrackSimScore = require('./topTracks');

exports.findMatches = functions.database.ref('/Users/{uid}/')
  .onWrite(event => {
    //we need top tracks, top artists, recent tracks, genres
    const userId = event.params.uid
    console.log('userId', userId)

    const user1TopArtists = event.data.val().topArtists.artists
    const user1TopTracks = event.data.val().topTracks.tracks
    const user1RecentSongs = event.data.val().recentSongs.songs

    // //we also need all of this for all other users
    // //dict  of key userId; value of matchScore
    const matchDict = {};
    let uid;

    event.data.ref.parent.once('value', function(snapshot){

        const users = Object.keys(snapshot.val())
        console.log(users)

        users.forEach(user => {

          const userInfo = (snapshot.val()[user])
          console.log('user in loop', userInfo)

          const user2TopArtists = userInfo.topArtists.artists
          const user2TopTracks = userInfo.topTracks.tracks
          const user2RecentSongs = userInfo.recentSongs.songs

          const genreScore = genreSimScore(user1TopArtists, user2TopArtists)
          const recentSongsScore = recentSongsSimScore(user1RecentSongs, user2RecentSongs)
          const artistsScore = topArtistsSimScore(user1TopArtists, user2TopArtists)
          const tracksScore = topTrackSimScore(user1TopTracks, user2TopTracks)

          const matchScore = (genreScore + recentSongsScore + artistsScore + tracksScore)/4

          if (!matchDict[user] & matchScore !== 0.5) {
            console.log(`/Users/${user.toString()}/matches/matchScores/${userId}`)
            return admin.database().ref(`/Users/${user.toString()}/matches/matchScores/${userId}`).set(matchScore)
            .then(valy => {
              console.log(`/Users/${userId}/matches/matchScores/${user.toString()}`)
              return admin.database().ref(`/Users/${userId}/matches/matchScores/${user.toString()}`).set(matchScore)
            })
          }

          if (matchScore === 0.5) {
            uid = user
          }

        })

        return matchDict
    })
    // .then(u => {
    //   console.log('where im writing to', `/Users/${uid}/matches`)
    //   return admin.database().ref(`/Users/${uid}/matches`).update({matchScores: matchDict})
    // })
    .then(result => console.log('new matches written'))





})
