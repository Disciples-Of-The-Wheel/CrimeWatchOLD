const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Dev = require('../.ds');
const { Reports } = require('./routes/reports');
const { Auth } = require('./routes/auth');
require('./strategy');

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
app.use('/', Auth);

app.listen(port, () => {
  console.log(`
  Listening at PORT:${port}
  `);
});
