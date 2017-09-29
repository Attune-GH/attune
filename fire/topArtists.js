// We want to retrieve:
// the top artists with id and popularityScore and the genres
// top tracks with id and popularityScore
// recent tracks with id and popularityScore



const user1TopArtists = require('./User1TopArtists')
const user2TopArtists = require ('./User2TopArtists')

let user1Arr = user1TopArtists.map(artist => {
  let id = artist.id
  let popularityScore = artist.popularityScore
  return {id, popularityScore}
})
let user2Arr = user2TopArtists.map(artist => {
  let id = artist.id
  let popularityScore = artist.popularityScore
  return {id, popularityScore}
})

let user1Set = new Set(user1Arr.map(artist => {
  return artist.id
}))

let user2Set = new Set(user2Arr.map(artist => {
  return artist.id
}))

let intersection = new Set([...user1Set].filter(artistId => {
  return user2Set.has(artistId)
}))

let intersectionScoreTopArtists = user1Arr.reduce((accumulator, artist) => {
  if ([...intersection].indexOf(artist.id) > -1) {
    return accumulator + artist.popularityScore
  } else return accumulator}, 0)

let user1Total = user1Arr.reduce((accumulator, artist)=> {
  return accumulator + artist.popularityScore
}, 0)

let user2Total = user2Arr.reduce((accumulator, artist)=> {
  return accumulator + artist.popularityScore
}, 0)

let unionScoreTopArtists = user1Total + user2Total

let similarityScore = intersectionScoreTopArtists/unionScoreTopArtists

module.exports ={intersectionScoreTopArtists, unionScoreTopArtists}
