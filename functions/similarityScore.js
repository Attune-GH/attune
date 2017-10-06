
const {intersectionScoreRecent, unionScoreRecent} = require('./recentTracks');
const {intersectionScoreTopTracks, unionScoreTopTracks} = require('./topTracks');
const {intersectionScoreTopArtists, unionScoreTopArtists} = require('./topArtists')
const {intersectionScoreGenres, unionScoreGenres} = require('./genres')


const totalIntersectScore = intersectionScoreRecent + intersectionScoreTopTracks + intersectionScoreTopArtists + intersectionScoreGenres
const totalUnionScore = unionScoreRecent + unionScoreTopTracks + unionScoreTopArtists + unionScoreGenres

let similarityScore = (totalIntersectScore) / (totalUnionScore)


    const recentSongs = event.data.val().recentSongs.songs.{id}.track
    const topTracks = event.data.topTracks.tracks.{id}
    const topArtists = event.data.val().topArtists.artists.{id}




function similarityScore(user1, user2) {}
    recentSongsUser1 = user1.recentSongs.songs
    recentsongsUser2 = user2.recentSongs.songs
    topTracksUser1 = user1.topTracks.tracks
    topTracksUser2 = user2.topTracks.tracks
    topArtistsUser1 = user1.topArtists.artists
    topArtistsUser2 = user2.topArtists.artists



}
