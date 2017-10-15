# This is 🎶🎶Attune🎶🎶

It's an 8-bit party game for 2-4 bad witches.

## How to use

You can use Attune on desktop or mobile, but it is best experienced on mobile.
* Go to http://attune.fun
* Click 'login with Spotify' to register.
* Hit the record icon in your footer to open the drawer app
* Customize your bio, see your matches, follow users, or message users!

## Configuration on local machine

Create a GitHub repo and clone it. After you have a repo on your machine:

```sh
npm install

create a secrets file that contains your own firebase auth info (we named ours "witches_brew.env.js")

create a secrets file that contains your own twilio auth info (we named ours "secrets.js")

npm run dev
```

Game will be running on localhost:1337

And then you'll have me! If I change – which I probably will – you can get the most recent
version by doing this again:

```sh
git fetch attune
git merge attune/master
```


## My anatomy

`/app` has the React setup. `main.jsx` is the entry point.

`/fire` has the Firebase config.

`/functions` is where your [cloud functions](https://firebase.google.com/preview/functions/write-firebase-functions) live.

`/bin` has scripts.

`/public` has all visual assets

## Conventions

I use `require` and `module.exports` in `.js` files.

I use `import` and `export` in `.jsx` files, unless `require` makes for cleaner code.

I use two spaces, no semi-colons, and generally prefer a less strict version of
[NPM's funny coding style](https://docs.npmjs.com/misc/coding-style). My lint config is
in [eslintrc.js](eslintrc.js).

## Licensing
This software is protected under the standard MIT License.
