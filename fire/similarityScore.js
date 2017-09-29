
const {intersectionScoreRecent, unionScoreRecent} = require('./recentTracks');
const {intersectionScoreTopTracks, unionScoreTopTracks} = require('./topTracks');
const {intersectionScoreTopArtists, unionScoreTopArtists} = require('./topArtists')


const totalIntersectScore = intersectionScoreRecent + intersectionScoreTopTracks
const totalUnionScore = unionScoreRecent + unionScoreTopTracks

let similarityScore = (totalIntersectScore) / (totalUnionScore)

console.log('totalSimilarityScore:', similarityScore)
