'use strict'

const {resolve} = require('path')
    , chalk = require('chalk')
    , pkg = require('./package.json')
    , debug = require('debug')(`${pkg.name}:boot`)

const express = require('express')
const cookieParser = require('cookie-parser');
const crypto = require('crypto')
const firebase = require('./fire')

const credentials = {
  client: {
    id: process.env.SPOTIFY_CLIENT_ID,
    secret: process.env.SPOTIFY_CLIENT_SECRET
  }, 
  auth: {
    tokenHost: 'https://accounts.spotify.com/api/token',
    tokenPath: '/oauth/token'
  }
}; 

const oauth2 = require('simple-oauth2').create(credentials);

const OAUTH_REDIRECT_PATH = '/redirect';
const OAUTH_CALLBACK_PATH = '/callback';
const scope = 'user-read-private user-read-email';

const app = express();
app.enable('trust proxy')
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());

app.get('/redirect', function (req, res){
  console.log("REQ.GET HOST", req.get('host'))
  const state = req.cookies.state || crypto.randomBytes(20).toString('hex');
  console.log('Setting state cookie for verification:', state);
  const secureCookie = req.get('host').indexOf('localhost:') !== 0;
  console.log('Need a secure cookie (i.e. not on localhost)?', secureCookie);
  res.cookie('state', state, {maxAge: 3600000, secure: secureCookie, httpOnly: true});
  const redirectUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${req.protocol}://${req.get('host')}${OAUTH_CALLBACK_PATH}`,
    scope: scope, 
    state: state
  });
  console.log('Redirecting to:', redirectUri);
  res.redirect(redirectUri);
});


app.get(OAUTH_CALLBACK_PATH, (req, res, next) => {
  console.log('Received state cookie:', req.cookies.state);
  console.log('Received state query parameter:', req.query.state);
  if (!req.cookies.state) {
    res.status(400).send('State cookie not set or expired. Maybe you took too long to authorize. Plzz try again.');
  } else if (req.cookies.state !== req.query.state) {
    res.status(400).send('State validation failed');
  }
  console.log('Received auth code:', req.query.code);
  oauth2.authorizationCode.getToken({
    code: req.query.code,
    redirect_uri: `${req.protocol}s://${req.get('host')}${OAUTH_CALLBACK_PATH}`
  }).then(results => {
    console.log('Auth code exchange result received:', results);
    const accessToken = results.access_token;
    const spotifyUserID = results.user.id;
    const profilePic = results.user.profile_picture;
    const userName = results.user.full_name;

  
    createFirebaseAccount(spotifyUserID, userName, profilePic, accessToken).then(firebaseToken => {
      res.send(signInFirebaseTemplate(firebaseToken, userName, profilePic, accessToken));
    });
  })
  .catch(console.log)
  
});

function createFirebaseAccount(spotifyID, displayName, photoURL, accessToken) {

  const uid = `spotify:${spotifyID}`;

  const databaseTask = admin.database().ref(`/spotifyAccessToken/${uid}`)
      .set(accessToken);

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

/**
 * Generates the HTML template that signs the user in Firebase using the given token and closes the
 * popup.
 */
function signInFirebaseTemplate(token) {
  return `
    <script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
    <script>
      var token = '${token}';
      var config = {
        apiKey: '${firebase.config.apiKey}'
      };
      var app = firebase.initializeApp(config);
      app.auth().signInWithCustomToken(token).then(function() {
        window.close();
      });
    </script>`;
}

// This will load a secrets file from
//
//      ~/.your_app_name.env.js
//   or ~/.your_app_name.env.json
//
// and add it to the environment.
// Note that this needs to be in your home directory, not the project's root directory
const env = process.env
    , secretsFile = resolve(require('homedir')(), `.${pkg.name}.env`)

try {
  Object.assign(env, require(secretsFile))
} catch (error) {
  debug('%s: %s', secretsFile, error.message)
  debug('%s: env file not found or invalid, moving on', secretsFile)
}


module.exports = {
  get name() { return pkg.name },
  get isTesting() { return !!global.it },
  get isProduction() {
    return env.NODE_ENV === 'production'
  },
  get isDevelopment() {
    return env.NODE_ENV === 'development'
  },
  get baseUrl() {
    return env.BASE_URL || `http://localhost:${module.exports.port}`
  },
  get port() {
    return env.PORT || 1337
  },
  get root() {
    return __dirname
  },
  package: pkg,
  env,
}

if(module === require.main){
  app.listen(module.exports.port)
}