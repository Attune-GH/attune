

module.exports = function(user1TopTracks, user2TopTracks) {



  let user1Arr = user1TopTracks.map(track => {
    let id = track.id
    let popularityScore = 101 - track.popularity
    return {id, popularityScore}
  })
  let user2Arr = user2TopTracks.map(track => {
    let id = track.id
    let popularityScore = 101 - track.popularity
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

  let intersectionScoreTopTracks = user1Arr.reduce((accumulator, track) => {
    if ([...intersection].indexOf(track.id) > -1) {
      return accumulator + track.popularityScore
    } else return accumulator}, 0)

  let user1Total = user1Arr.reduce((accumulator, track)=> {
    return accumulator + track.popularityScore
  }, 0)

  let user2Total = user2Arr.reduce((accumulator, track)=> {
    return accumulator + track.popularityScore
  }, 0)

  let unionScoreTopTracks = user1Total + user2Total

  return similarityScore = intersectionScoreTopTracks/unionScoreTopTracks
}


