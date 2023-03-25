const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '478202609279-iiq2abjnnpe32jk0npoai4c4b3ofatql.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/google/callback',
  },
  ((accessToken, refreshToken, profile, cb) => cb(null, profile)),
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
