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

console.log('intersection', intersection)
// console.log('user1Arr', user1Arr)
// console.log('user2Arr', user2Arr)
// console.log('user1Set', user1Set)
// console.log('user2Set', user2Set)

let intersectionScores = [...intersection]