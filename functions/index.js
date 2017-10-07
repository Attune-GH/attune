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
      console.log(user1Obj)
      const user1TopArtists = user1ObjtopArtists.artists
      const user1TopTracks = user1Obj.topTracks.tracks
      const user1RecentSongs = user1Obj.recentSongs.songs

      console.log('user1TopArtists', user1TopArtists)
      console.log('user1TopTracks', user1TopTracks)
      console.log('user1RecentSongs', user1RecentSongs)


    }).catch(console.error)



  })


// exports.findMatches = functions.database.ref('/Users/{uid}/')
//   .onWrite(event => {
//     //we need top tracks, top artists, recent tracks, genres
//     const userId = event.params.uid
//     console.log('userId', userId)

//     if(event.data.val().topArtists) {const user1TopArtists = event.data.val().topArtists.artists}
//     if(event.data.val().topTracks) {const user1TopTracks = event.data.val().topTracks.tracks}
//     if(event.data.val().recentSongs) {constuser1RecentSongs = event.data.val().recentSongs.songs}

//     console.log('if statement test', user1TopTracks, user1TopArtists, user1RecentSongs)

//       // event.data.ref.parent.once('value', function(snapshot){

//         // const users = Object.keys(snapshot.val())
//         // .then(
//         //   users.forEach(user => {

//         //     const userInfo = (snapshot.val()[user])
//         //     console.log('user in loop', userInfo)

//         //     const promise3 = userInfo.topArtists.artists
//         //     const promise4 = userInfo.topTracks.tracks
//         //     const promise5 = userInfo.recentSongs.songs

//         //     Promise.all([promise3, promise4, promise5])
//         //     .then(results => {
//         //       const user2TopArtists = results[0]
//         //       const user2TopTracks = results[1]
//         //       const user2RecentSongs = results[2]

//         //       console.log('in promise.all 2', user2TopArtists, user2TopTracks, user2RecentSongs)

//           })

//  //        }))
//  //      })
//  // )})
//  //  })


    // event.data.ref.parent.once('value', function(snapshot){

    //     const users = Object.keys(snapshot.val())
    //     console.log(users)

    //     users.forEach(user => {

    //       const userInfo = (snapshot.val()[user])
    //       console.log('user in loop', userInfo)

    //       const user2TopArtists = userInfo.topArtists.artists
    //       const user2TopTracks = userInfo.topTracks.tracks
    //       const user2RecentSongs = userInfo.recentSongs.songs

    //       const genreScore = genreSimScore(user1TopArtists, user2TopArtists)
    //       const recentSongsScore = recentSongsSimScore(user1RecentSongs, user2RecentSongs)
    //       const artistsScore = topArtistsSimScore(user1TopArtists, user2TopArtists)
    //       const tracksScore = topTrackSimScore(user1TopTracks, user2TopTracks)

    //       const matchScore = (genreScore + recentSongsScore + artistsScore + tracksScore)/4

    //       if (!matchDict[user] & matchScore !== 0.5) {
    //         console.log(`/Users/${user.toString()}/matches/matchScores/${userId}`)
    //         return admin.database().ref(`/Users/${user.toString()}/matches/matchScores/${userId}`).set(matchScore)
    //         .then(valy => {
    //           console.log(`/Users/${userId}/matches/matchScores/${user.toString()}`)
    //           return admin.database().ref(`/Users/${userId}/matches/matchScores/${user.toString()}`).set(matchScore)
    //         })
    //       }
    //     })

    //     return matchDict
    // })
    // // .then(u => {
    // //   console.log('where im writing to', `/Users/${uid}/matches`)
    // //   return admin.database().ref(`/Users/${uid}/matches`).update({matchScores: matchDict})
    // // })
    // .then(result => console.log(`new matches written to ${userId}`))
