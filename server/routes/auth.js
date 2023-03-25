const { Router } = require('express');
const passport = require('passport');

const Auth = Router();

function isLoggedIn(req, res, next) {
  return req.user ? next() : res.sendStatus(401);
}

Auth.get('/signin', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

Auth.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

Auth.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/failure',
  }),
);

Auth.get('/auth/failure', (req, res) => {
  res.send('something went wrong');
});

Auth.get('/', isLoggedIn, (req, res) => {
  res.send('hello');
});

module.exports = {
  Auth,
};
