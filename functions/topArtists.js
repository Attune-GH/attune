

module.exports = function(user1TopArtists, user2TopArtists) {
  let user1Arr = user1TopArtists.map(artist => {
    let id = artist.id
    let popularityScore = 101 - artist.popularity
    return {id, popularityScore}
  })
  let user2Arr = user2TopArtists.map(artist => {
    let id = artist.id
    let popularityScore = 101 - artist.popularity
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

  return similarityScore = intersectionScoreTopArtists/unionScoreTopArtists
}
