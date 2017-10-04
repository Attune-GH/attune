var functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const genreSimScore = require('./genres');
const recentSongsSimScore = require('./recentTracks');
const topArtistsSimScore = require('./topArtists');
const topTrackSimScore = require('./topTracks');

exports.findMatches = functions.database.ref('/Users/{uri}')
  .onWrite(event => {

    //we need top tracks, top artists, recent tracks, genres
    // const userId = event.params.userId

    const user1TopArtists = event.data.val().topArtists.artists
    const user1TopTracks = event.data.val().topTracks.tracks
    const user1RecentSongs = event.data.val().recentSongs.songs

    // //we also need all of this for all other users
    // //dict  of key userId; value of matchScore
    const matchDict = {}

    event.data.ref.parent.once('value', function(snapshot){
        const users = Object.keys(snapshot.val())
        console.log('snapshot.val', snapshot.val())
        console.log('users', users)


        users.forEach(user => {

          const userInfo = (snapshot.val()[user])

          const user2TopArtists = userInfo.topArtists.artists
          const user2TopTracks = userInfo.topTracks.tracks
          const user2RecentSongs = userInfo.recentSongs.songs

          const genreScore = genreSimScore(user1TopArtists, user2TopArtists)
          const recentSongsScore = recentSongsSimScore(user1RecentSongs, user2RecentSongs)
          const artistsScore = topArtistsSimScore(user1TopArtists, user2TopArtists)
          const tracksScore = topTrackSimScore(user1TopTracks, user2TopTracks)

          const matchScore = (genreScore + recentSongsScore + artistsScore + tracksScore)/4

          if (!matchDict[user] & matchScore !== 0.5) matchDict[user] = matchScore
          console.log(matchDict)
        })
    })
})
