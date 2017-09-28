// Get a reference to the database service
const database = firebase.database();

//top artists
const fetchTopArtists = () => {
  axios.get('https://api.spotify.com/v1/me/top/artists')
    .then(res => res.data)
    .then(data => {
       return data.items.map((obj) => {
       let artist = {};
       artist.id = obj.id;
       artist.name = obj.name;
       artist.popularity = obj.popularity;
       artist.genres = obj.genres;
       return artist
      })
    })
    .then(topArtistsArr => {
      firebase.Databse().ref(`'users/${userId}`).set({
        topArtists: topArtistsArr
      })
    })
}

//top genres
const fetchTopTracks = () => {
  axios.get('https://api.spotify.com/v1/me/top/tracks')
    .then(res => res.data)
    .then(data => {
      return data.items.map((obj) => {
        let track = {};
        track.id = obj.id;
        track.artist = track.artist.map((artist) => artist.name)
        track.name = obj.name;
        track.popularity = obj.popularity
      })
    })
    .then(topTracksArr => {
      firebase.Database().ref('users/' + userId).set({
        topTracks: topTracksArr
      })
    })
}

//recent tracks
const fetchRecentTracks = () => {
  axios.get('https://api.spotify.com/v1/me/player/recently-played')
    .then(res => res.data)
    .then(data => {
      return data.items.map((obj) => {
        let track = {};
        track.id = obj.id;
        track.artist = track.artist.map((artist) => artist.name)
        track.name = obj.name;
        track.popularity = obj.popularity
      })
    })
    .then(recentTracksArr => {
      firebase.Database().ref('users/' + userId).set({
        recentTracks: recentTracksArr
      })
    })
}

const spotifyUserProfile = () => {
  axios.get('https://api.spotify.com/v1/me')
    .then(res => res.data)
    .then(data => )
}


