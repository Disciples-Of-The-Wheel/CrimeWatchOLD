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

const port = 8080;
const distPath = path.resolve(__dirname, '..', 'dist');

const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
app.use(Dev());
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
  Listening at PORT:${port}
  `);
});
