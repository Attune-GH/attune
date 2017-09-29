// We want to retrieve:
// the top artists with id and popularityScore and the genres
// top tracks with id and popularityScore
// recent tracks with id and popularityScore



const user1Genres = require('./User1TopArtists')
const user2Genres = require ('./User2TopArtists')

const user1Arr = user1Genres.map(artist => {
  return artist.genres
})

const user1Concat = [].concat.apply([], user1Arr)

const user2Arr = user2Genres.map(artist => {
  return artist.genres
})

const user2Concat = [].concat.apply([], user2Arr)


let user1Set = new Set(user1Concat)

let user2Set = new Set(user2Concat)


let intersectionGenres = new Set([...user1Set].filter(genre => {
  return user2Set.has(genre)
}))

let intersectionScoreGenres = ([...intersectionGenres].reduce((accumulator, genre)=> {
  return accumulator + 1
}, 0))*100

let user1Total = user1Concat.reduce((accumulator, genre)=> {
  return accumulator + 1
}, 0)

let user2Total = user2Concat.reduce((accumulator, genre)=> {
  return accumulator + 1
}, 0)

let unionScoreGenres = (user1Total + user2Total) * 100

let similarityScore = intersectionScoreGenres/unionScoreGenres


module.exports ={intersectionScoreGenres, unionScoreGenres}
