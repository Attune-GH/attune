// We want to retrieve:
// the top artists with id and popularityScore and the genres
// top tracks with id and popularityScore
// recent tracks with id and popularityScore



const user1Genres = require('./User1TopArtists')
const user2Genres = require ('./User2TopArtists')

let user1Arr = user1Genres.map(artist => {
  return artist.genres.split('')
})

console.log(user1Arr)

let user2Arr = user2RecentTracks.map(track => {
  let id = track.id
  let popularityScore = track.popularityScore
  return {id, popularityScore}
})

let user1Set = new Set(user1Arr.map(track => {
  return track.id
}))

let user2Set = new Set(user2Arr.map(track => {
  return track.id
}))

let intersection = new Set([...user1Set].filter(trackId => {
  return user2Set.has(trackId)
}))

let intersectionScoreRecent = user1Arr.reduce((accumulator, track) => {
  if ([...intersection].indexOf(track.id) > -1) {
    return accumulator + track.popularityScore
  } else return accumulator}, 0)

let user1Total = user1Arr.reduce((accumulator, track)=> {
  return accumulator + track.popularityScore
}, 0)

let user2Total = user2Arr.reduce((accumulator, track)=> {
  return accumulator + track.popularityScore
}, 0)

let unionScoreRecent = user1Total + user2Total

let similarityScore = intersectionScoreRecent/unionScoreRecent

module.exports ={intersectionScoreRecent, unionScoreRecent}
