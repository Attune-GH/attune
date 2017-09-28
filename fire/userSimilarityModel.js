// We want to retrieve:
// the top artists with id and popularityScore and the genres
// top tracks with id and popularityScore
// recent tracks with id and popularityScore


// router.get('/findFriends/:userId', (req, res, next) => {
//   "https://attune-d8afe.firebaseio.com/:userId/topArtists"
// })



const user1RecentTracks = require('./User1RecentlyPlayed')
const user2RecentTracks = require ('./User2RecentlyPlayed')

let user1Arr = user1RecentTracks.map(track => {
  let id = track.id
  let popularityScore = track.popularityScore
  return {id, popularityScore}
})
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

let intersectionScore = user1Arr.reduce((accumulator, track) => {
  if ([...intersection].indexOf(track.id) > -1) {
    return accumulator + track.popularityScore
  } else return accumulator}, 0)

let user1Total = user1Arr.reduce((accumulator, track)=> {
  return accumulator + track.popularityScore
}, 0)

let user2Total = user2Arr.reduce((accumulator, track)=> {
  return accumulator + track.popularityScore
}, 0)

let unionScore = user1Total + user2Total

let similarityScore = intersectionScore/unionScore

console.log(similarityScore)
