var functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const genreSimScore = require('./genres');
const recentSongsSimScore = require('./recentTracks');
const topArtistsSimScore = require('./topArtists');
const topTrackSimScore = require('./topTracks');


// exports.Matches = functions.https.onRequest((req, res) => {
//   console.log('inFindMatches')
//   })

exports.getMatches = functions.database.ref('/Users/{uid}/requestMatches')
  .onWrite(event=> {
    console.log('inGetMatches')
    const userId = event.params.uid
    console.log('userId in getMatches', userId)

    const Users = admin.database().ref('Users').once('value').then(snapshot => {

      const usersObj = snapshot.val()
      const userNames = Object.keys(usersObj).filter(name => name !== userId)

      const user1Obj = usersObj[userId]

      const user1TopArtists = user1Obj.topArtists.artists
      const user1TopTracks = user1Obj.topTracks.tracks
      const user1RecentSongs = user1Obj.recentSongs.songs

      userNames.forEach(user => {
        user2Obj = usersObj[user];

        let user2TopArtists
        let user2TopTracks
        let user2RecentSongs

        user2TopArtists =  (user2Obj.topArtists ? user2Obj.topArtists.artists : [])
        user2TopTracks =  (user2Obj.topTracks ? user2Obj.topTracks.tracks : [])
        user2RecentSongs =  (user2Obj.recentSongs ? user2Obj.recentSongs.songs : [])

        const genreScore = genreSimScore(user1TopArtists, user2TopArtists)
        const recentSongsScore = recentSongsSimScore(user1RecentSongs, user2RecentSongs)
        const artistsScore = topArtistsSimScore(user1TopArtists, user2TopArtists)
        const tracksScore = topTrackSimScore(user1TopTracks, user2TopTracks)

        const matchScore = (genreScore + recentSongsScore + artistsScore + tracksScore)/4

        // console.log(`${user}'s match score: ${matchScore}`)
        // console.log(`/Users/${userId}/matches/matchScores/${user}`)
        return admin.database().ref(`/Users/${userId}/matches/matchScores/${user}`).set(matchScore)

      })


    }).catch(console.error)



  })


    //         .then(valy => {
    //           console.log(`/Users/${userId}/matches/matchScores/${user.toString()}`)
    //           return admin.database().ref(`/Users/${userId}/matches/matchScores/${user.toString()}`).set(matchScore)
    //         })
    //       }
    //     })

    // })
    // // .then(u => {
    // //   console.log('where im writing to', `/Users/${uid}/matches`)
    // //   return admin.database().ref(`/Users/${uid}/matches`).update({matchScores: matchDict})
    // // })
    // .then(result => console.log(`new matches written to ${userId}`))
