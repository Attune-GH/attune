
const {intersectionScoreRecent, unionScoreRecent} = require('./recentTracks');
const {intersectionScoreTopTracks, unionScoreTopTracks} = require('./topTracks');
const {intersectionScoreTopArtists, unionScoreTopArtists} = require('./topArtists')
const {intersectionScoreGenres, unionScoreGenres} = require('./genres')


const totalIntersectScore = intersectionScoreRecent + intersectionScoreTopTracks + intersectionScoreTopArtists + intersectionScoreGenres
const totalUnionScore = unionScoreRecent + unionScoreTopTracks + unionScoreTopArtists + unionScoreGenres

let similarityScore = (totalIntersectScore) / (totalUnionScore)

console.log('totalSimilarityScore:', similarityScore)
