const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://3.135.195.99:4000/google/callback',
  },
  ((accessToken, refreshToken, profile, cb) => cb(null, profile)),
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
