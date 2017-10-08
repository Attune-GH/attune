var functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const genreSimScore = require('./genres');
const recentSongsSimScore = require('./recentTracks');
const topArtistsSimScore = require('./topArtists');
const topTrackSimScore = require('./topTracks');



exports.getMatches = functions.database.ref('/Users/{uid}/requestMatches')
  .onWrite(event=> {
    const userId = event.params.uid
    console.log('userId in getMatches', userId)

    return admin.database().ref('Users').once('value').then(snapshot => {

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

        const genresScore = genreSimScore(user1TopArtists, user2TopArtists)
        const recentSongsScore = recentSongsSimScore(user1RecentSongs, user2RecentSongs)
        const artistsScore = topArtistsSimScore(user1TopArtists, user2TopArtists)
        const tracksScore = topTrackSimScore(user1TopTracks, user2TopTracks)

        const matchScore = (genresScore + recentSongsScore + artistsScore + tracksScore)/4

        console.log(`${user}'s match score: ${matchScore}`)
        console.log(`/Users/${userId}/matches/matchScores/${user}`)
        //masterscore
        admin.database().ref(`/Users/${userId}/matches/matchScores/${user}`).set(matchScore)
        admin.database().ref(`/Users/${user}/matches/matchScores/${userId}`).set(matchScore)
        //genrescore
        admin.database().ref(`/Users/${userId}/matches/genreScores/${user}`).set(genresScore)
        admin.database().ref(`/Users/${user}/matches/genreScores/${userId}`).set(genresScore)
        //recentSongsScore
        admin.database().ref(`/Users/${userId}/matches/recentSongsScores/${user}`).set(recentSongsScore)
        admin.database().ref(`/Users/${user}/matches/recentSongsScores/${userId}`).set(recentSongsScore)
        //artistscore
        admin.database().ref(`/Users/${userId}/matches/artistsScores/${user}`).set(artistsScore)
        admin.database().ref(`/Users/${user}/matches/artistsScores/${userId}`).set(artistsScore)
        //trackScore
        admin.database().ref(`/Users/${userId}/matches/tracksScores/${user}`).set(tracksScore)
        admin.database().ref(`/Users/${user}/matches/tracksScores/${userId}`).set(tracksScore)
      })


    }).catch(console.error)



  })
