/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 *
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
if (process.env.NODE_ENV === 'development') {
  require('./.secrets/spotify.js');
  require('./.secrets/attune-d8afe-firebase-adminsdk-m5rub-8c85814d02.js'); // this will mutate the process.env object with your secrets.
}

let attune

  ((process.env.NODE_ENV === 'development') ?
   attune = admin.initializeApp({
  "credential": admin.credential.cert({
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key": process.env.private_key,
  "client_email": process.env.client_email,
  "private_key_id": process.env.private_key_id,

  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_ur": process.env.client_x509_cert_url
  })
, "databaseURL": 'https://attune-d8afe.firebaseio.com/'})
  :
   attune = admin.initializeApp({
  "credential": admin.credential.cert({
  "type": process.env.type,
  "project_id": process.env.project_id,
  "private_key": JSON.parse(process.env.private_key),
  "client_email": process.env.client_email,
  "private_key_id": process.env.private_key_id,

  "client_id": process.env.client_id,
  "auth_uri": process.env.auth_uri,
  "token_uri": process.env.token_uri,
  "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
  "client_x509_cert_ur": process.env.client_x509_cert_url
  })
, "databaseURL": 'https://attune-d8afe.firebaseio.com/'})
  )



var redirect_uri = (process.env.NODE_ENV === 'development' ? 'http://localhost:1337/callback' : 'http://attune.fun/callback'); // Your cal uri


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-follow-read user-top-read user-read-recently-played user-read-private user-read-email user-library-read user-read-birthdate';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.spotify_client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});


app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'State mismatch between request and cookie'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.spotify_client_id + ':' + process.env.spotify_client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          const encodeKey = (s)=> (s).replace(/\./g, ',')
          body.uri = encodeKey(body.uri)
          if (body.birthdate === null || undefined) body.birthdate = '0'
          if (body.display_name === null || undefined)  body.display_name = body.id
          if(!body.images.length) body.images.push({url: 'http://voice4thought.org/wp-content/uploads/2016/08/default2-1.jpg'})
          const {uri, id, display_name, images: [{url: profilePic}], birthdate} = body
          createFirebaseAccount(uri, display_name, profilePic, birthdate, access_token, refresh_token)
            .then(firebaseToken => {
              res.send(signInFirebaseTemplate(firebaseToken));
            })
            .catch(console.error)
        });


      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (process.env.spotify_client_id + ':' + process.env.spotify_client_secret).toString('base64') },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


app.get('/*', (req, res) => res.sendFile(__dirname + '/public/index.html'))

/**
 * Generates the HTML template that signs the user in Firebase using the given token and closes the
 * popup.
 */
function signInFirebaseTemplate(token) {
  return `
    <script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
    <script>
      var token = ${JSON.stringify(token)};
      var config = ${JSON.stringify(require('./fire/config'))};
      var app = firebase.initializeApp(config);
      app.auth().signInWithCustomToken(token).then(() => location.replace('/')).catch(console.error);
    </script>`;
}

function createFirebaseAccount(uid, displayName, photoURL, birthdate, accessToken, refreshToken) {

  const optionsRecent = {
      url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    };

    const optionsTopArtists = {
      url: 'https://api.spotify.com/v1/me/top/artists?limit=50',
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    };

    const optionsTopTracks = {
      url: 'https://api.spotify.com/v1/me/top/tracks?limit=50',
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
    }

    //set Spotify profile information on the db
    // admin.database().ref(`/Users/${uid}/`)
    //       .update({userProfile: {uid, displayName, photoURL, birthdate}})

    admin.database().ref(`/Users/${uid}/userProfile`)
        .set({uid, displayName, photoURL, birthdate})

    request.get(optionsRecent, function(error, response, body){
      const items = body.items      
      const getRecentSongs = admin.database().ref(`/Users/${uid}/recentSongs`)
        .set({songs: items})
    })

    request.get(optionsTopArtists, function(error, response, body){
      const items = body.items    
      const getTopArists = admin.database().ref(`/Users/${uid}/topArtists`)
        .set({artists: items})
    })

    request.get(optionsTopTracks, function(error, response, body){
      const items = body.items 
      const getTopTracks = admin.database().ref(`/Users/${uid}/topTracks`)
        .set({tracks: items})
    })

    const databaseTask = admin.database().ref(`/spotifyAccessToken/${uid}`)
        .set({accessToken, refreshToken});
    const userCreationTask = admin.auth().updateUser(uid, {
      displayName: displayName,
      photoURL: photoURL
    }).catch(error => {
      if (error.code === 'auth/user-not-found') {
        return admin.auth().createUser({
          uid: uid,
          displayName: displayName,
          photoURL: photoURL
        });
      }
      throw error;
    });

    return Promise.all([userCreationTask, databaseTask]).then(() => {
      const token = admin.auth().createCustomToken(uid);
      console.log('Created Custom token for UID "', uid, '" Token:', token);
      return token;
    });
  }


console.log('Listening on 1337');
app.listen((process.env.PORT || 1337), function(){
  console.log('listening on 1337');
});
