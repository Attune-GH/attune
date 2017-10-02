import React from 'react'
import { Button, Image } from 'react-bootstrap'

const dummy = {
  "country" : "US",
  "display_name" : "Juan-Pablo Velez",
  "email" : "jpvelez@gmail.com",
  "external_urls" : {
    "spotify" : "https://open.spotify.com/user/jpvelez"
  },
  "followers" : {
    "href" : null,
    "total" : 27
  },
  "href" : "https://api.spotify.com/v1/users/jpvelez",
  "id" : "jpvelez",
  "images" : [ {
    "height" : null,
    "url" : "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/1545985_10100551300880440_1327011065409560427_n.jpg?oh=a00501208ec5365de8f9fd9e12ef8536&oe=5A3C8CFE",
    "width" : null
  } ],
  "product" : "premium",
  "type" : "user",
  "uri" : "spotify:user:jpvelez"
}

const tracks = {
  "items" : [ {
    "track" : {
      "album" : {
        "album_type" : "album",
        "artists" : [ {
          "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
          },
          "href" : "https://api.spotify.com/v1/artists/0kbYTNQb4Pb1rPbbaF0pT4",
          "id" : "0kbYTNQb4Pb1rPbbaF0pT4",
          "name" : "Miles Davis",
          "type" : "artist",
          "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4"
        } ],
        "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "US", "UY" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/4sb0eMpDn3upAFfyi4q2rw"
        },
        "href" : "https://api.spotify.com/v1/albums/4sb0eMpDn3upAFfyi4q2rw",
        "id" : "4sb0eMpDn3upAFfyi4q2rw",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/dd695d8a18d33640f2abca4588ef36a8ac1811a6",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/01f81fbd70d1cef051806e892e6db4e49224697b",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/ac887b673483fd6cd03a72bab311affcd9f8de14",
          "width" : 64
        } ],
        "name" : "Kind Of Blue (Legacy Edition)",
        "type" : "album",
        "uri" : "spotify:album:4sb0eMpDn3upAFfyi4q2rw"
      },
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
        },
        "href" : "https://api.spotify.com/v1/artists/0kbYTNQb4Pb1rPbbaF0pT4",
        "id" : "0kbYTNQb4Pb1rPbbaF0pT4",
        "name" : "Miles Davis",
        "type" : "artist",
        "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "US", "UY" ],
      "disc_number" : 1,
      "duration_ms" : 586400,
      "explicit" : false,
      "external_ids" : {
        "isrc" : "USSM15900114"
      },
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/2x91iJc0UkFcjRMEZ2CoWB"
      },
      "href" : "https://api.spotify.com/v1/tracks/2x91iJc0UkFcjRMEZ2CoWB",
      "id" : "2x91iJc0UkFcjRMEZ2CoWB",
      "name" : "Freddie Freeloader",
      "popularity" : 58,
      "preview_url" : "https://p.scdn.co/mp3-preview/254460379133630c31488ffa15b6dbd37ea78da8?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 2,
      "type" : "track",
      "uri" : "spotify:track:2x91iJc0UkFcjRMEZ2CoWB"
    },
    "context" : {
      "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
      },
      "href" : "https://api.spotify.com/v1/artists/null",
      "type" : "artist"
    },
    "played_at" : "2017-09-26T00:18:43.609Z"
  }, {
    "track" : {
      "album" : {
        "album_type" : "album",
        "artists" : [ {
          "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
          },
          "href" : "https://api.spotify.com/v1/artists/0kbYTNQb4Pb1rPbbaF0pT4",
          "id" : "0kbYTNQb4Pb1rPbbaF0pT4",
          "name" : "Miles Davis",
          "type" : "artist",
          "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4"
        } ],
        "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "US", "UY" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/4VUawqEDCHHfrUe77ScQ2K"
        },
        "href" : "https://api.spotify.com/v1/albums/4VUawqEDCHHfrUe77ScQ2K",
        "id" : "4VUawqEDCHHfrUe77ScQ2K",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/4c5a0b4482919abe636d43749a37fbc20d3b9102",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/a2eda03477b8be9a186c8f22d993f52a35e9ee86",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/611fed55dff11d4071e2d84895ffcf17d388d49d",
          "width" : 64
        } ],
        "name" : "'Round About Midnight",
        "type" : "album",
        "uri" : "spotify:album:4VUawqEDCHHfrUe77ScQ2K"
      },
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
        },
        "href" : "https://api.spotify.com/v1/artists/0kbYTNQb4Pb1rPbbaF0pT4",
        "id" : "0kbYTNQb4Pb1rPbbaF0pT4",
        "name" : "Miles Davis",
        "type" : "artist",
        "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "US", "UY" ],
      "disc_number" : 1,
      "duration_ms" : 355333,
      "explicit" : false,
      "external_ids" : {
        "isrc" : "USSM15600497"
      },
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/5vb7At47uO0yPGfmYnAHuw"
      },
      "href" : "https://api.spotify.com/v1/tracks/5vb7At47uO0yPGfmYnAHuw",
      "id" : "5vb7At47uO0yPGfmYnAHuw",
      "name" : "'Round Midnight",
      "popularity" : 61,
      "preview_url" : "https://p.scdn.co/mp3-preview/df1c591632611648495df545085da3248074dd41?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 1,
      "type" : "track",
      "uri" : "spotify:track:5vb7At47uO0yPGfmYnAHuw"
    },
    "context" : {
      "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
      },
      "href" : "https://api.spotify.com/v1/artists/null",
      "type" : "artist"
    },
    "played_at" : "2017-09-26T00:12:47.803Z"
  }, {
    "track" : {
      "album" : {
        "album_type" : "album",
        "artists" : [ {
          "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
          },
          "href" : "https://api.spotify.com/v1/artists/0kbYTNQb4Pb1rPbbaF0pT4",
          "id" : "0kbYTNQb4Pb1rPbbaF0pT4",
          "name" : "Miles Davis",
          "type" : "artist",
          "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4"
        } ],
        "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "US", "UY" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/4sb0eMpDn3upAFfyi4q2rw"
        },
        "href" : "https://api.spotify.com/v1/albums/4sb0eMpDn3upAFfyi4q2rw",
        "id" : "4sb0eMpDn3upAFfyi4q2rw",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/dd695d8a18d33640f2abca4588ef36a8ac1811a6",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/01f81fbd70d1cef051806e892e6db4e49224697b",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/ac887b673483fd6cd03a72bab311affcd9f8de14",
          "width" : 64
        } ],
        "name" : "Kind Of Blue (Legacy Edition)",
        "type" : "album",
        "uri" : "spotify:album:4sb0eMpDn3upAFfyi4q2rw"
      },
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
        },
        "href" : "https://api.spotify.com/v1/artists/0kbYTNQb4Pb1rPbbaF0pT4",
        "id" : "0kbYTNQb4Pb1rPbbaF0pT4",
        "name" : "Miles Davis",
        "type" : "artist",
        "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "US", "UY" ],
      "disc_number" : 1,
      "duration_ms" : 562640,
      "explicit" : false,
      "external_ids" : {
        "isrc" : "USSM15900113"
      },
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/4vLYewWIvqHfKtJDk8c8tq"
      },
      "href" : "https://api.spotify.com/v1/tracks/4vLYewWIvqHfKtJDk8c8tq",
      "id" : "4vLYewWIvqHfKtJDk8c8tq",
      "name" : "So What",
      "popularity" : 63,
      "preview_url" : "https://p.scdn.co/mp3-preview/e692f71aa410f2dd6dc50e59e7f75e31d925aca5?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 1,
      "type" : "track",
      "uri" : "spotify:track:4vLYewWIvqHfKtJDk8c8tq"
    },
    "context" : {
      "uri" : "spotify:artist:0kbYTNQb4Pb1rPbbaF0pT4",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/0kbYTNQb4Pb1rPbbaF0pT4"
      },
      "href" : "https://api.spotify.com/v1/artists/null",
      "type" : "artist"
    },
    "played_at" : "2017-09-26T00:03:24.685Z"
  } ],
  "next" : "https://api.spotify.com/v1/me/player/recently-played?before=1506384204685&limit=3",
  "cursors" : {
    "after" : "1506385123609",
    "before" : "1506384204685"
  },
  "limit" : 3,
  "href" : "https://api.spotify.com/v1/me/player/recently-played?limit=3"
}

export default () => {
  return (
    //if ISUSER then render the log out button
    <div>
      <div>
        <Image src={dummy.images[0].url} className="user-img" circle />
        <div>{dummy.display_name.split(' ').slice(0, 1).join('') || dummy.id} </div>
      </div>
      <button>follow || message</button>
      <button>block</button>
      <div>
      <button className="btn btn-primary btn-profile"><a href={dummy.external_urls.spotify}>View Spotify Profile</a></button>
      </div>
      <div>
        <div>Recently Played</div>
        <div>
          <div>{
            tracks.items.map((track) => <div id={track.id}><iframe src={`https://open.spotify.com/embed?uri=${track.track.uri}`} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe></div>)
            }</div>
        </div>
      </div>
    </div>
  )
}
