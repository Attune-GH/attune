// We want to retrieve:
// the top artists with id and popularityScore and the genres
// top tracks with id and popularityScore
// recent tracks with id and popularityScore



const user1Genres = require('./User1TopArtists')
const user2Genres = require ('./User2TopArtists')

const user1Arr = user1Genres.map(artist => {
  return artist.genres
})

const user2Arr = user2Genres.map(artist => {
  return artist.genres
})

const user1Concat = [].concat.apply([], user1Arr)

const user2Concat = [].concat.apply([], user2Arr)

const user1ConcatGenres = user1Concat.slice()
const user2ConcatGenres = user2Concat.slice()


function findGenreOverlap(arr1, arr2) {
  let overlappingGenres = []
  for(let i = 0; i < arr1.length; i++) {
    let overlapIndex = arr2.indexOf(arr1[i])
    if(overlapIndex > -1) {
      overlappingGenres.push(arr1[i])
      arr2.splice(overlapIndex, 1)
    }
  }
  return overlappingGenres.length * 10
}

let intersectionScoreGenres = findGenreOverlap(user1ConcatGenres, user2ConcatGenres)

let user1Total = user1Concat.length

let user2Total = user2Concat.length

let unionScoreGenres = (user1Total + user2Total) * 10

let similarityScore = intersectionScoreGenres/unionScoreGenres


module.exports ={intersectionScoreGenres, unionScoreGenres}
