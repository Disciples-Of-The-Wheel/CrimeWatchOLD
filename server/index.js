const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Dev = require('../.ds');
const { Reports } = require('./routes/reports');
require('./routes/auth');

function isLoggedIn(req, res, next) {
  return req.user ? next() : res.sendStatus(401);
}

const port = 4000;
const distPath = path.resolve(__dirname, '..', 'dist');

const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware - every request runs thru this middleware
app.use(express.json()); // Parse the request body
app.use(express.urlencoded({ extended: true })); // Parses url
app.use(express.static(distPath)); // Statically serve up client directory
app.use(Dev()); // Dev middleware - do not move
app.use('/api/reports', Reports);

app.get('/signup', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  }),
);

app.get('/auth/failure', (req, res) => {
  res.send('something went wrong');
});

app.get('/protected', isLoggedIn, (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
