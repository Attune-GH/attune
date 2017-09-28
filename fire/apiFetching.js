// Get a reference to the database service
const database = firebase.database();

//when we do the sample api requests on the web dev console we have to request the suggested/relevent scopes such that the ouath token yields us the desired results. we hypothesize that spotify will ask for the relevant permissions for each user and thus generate the correct token, but we should keep this scope/tokening in mind if we are not getting back the results we desire.
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
    .then(data => {
      let user = {};
      user.name = data.display_name
      user.id = user.id
      if(data.birthdate) user.birthdate = data.birthday;
      if (data.country) user.counter = data.country;
      if (data.email) user.email = data.email;
      if (data.images) user.images = data.images;
//also available: external urls, followers(href and total)
    })
}


