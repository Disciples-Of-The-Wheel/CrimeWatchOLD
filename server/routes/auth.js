require('dotenv').config();
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://ec2-3-135-195-99.us-east-2.compute.amazonaws.com:8080/google/callback',
  },
  ((accessToken, refreshToken, profile, cb) => cb(null, profile)),
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
