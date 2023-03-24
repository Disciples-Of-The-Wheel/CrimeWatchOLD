const path = require('path');
const express = require('express');
const Dev = require('../.ds');
const { Report } = require('./db');

const port = 4000;
const distPath = path.resolve(__dirname, '..', 'dist');

const app = express();

// Middleware - every request runs thru this middleware

app.use(express.json()); // Parse the request body
app.use(express.urlencoded({ extended: true })); // Parses url
app.use(express.static(distPath)); // Statically serve up client directory
app.use(Dev()); // Dev middleware - do not move

app.get('/api/reports', (req, res) => {
  // Use the User model to interact with the users table of the db
  // Find the squelize method for searching a table
  Report.findAll()
    // If successful, 200 status code + respod with data
    .then((reports) => {
      res.status(200);
      res.send(reports);
    })
    // If not, 500 status code + log the error
    .catch((err) => {
      console.log('Failed to GET all reports:', err);
      res.sendStatus(500);
    });
});

app.post('/api/reports', (req, res) => {
  const { report } = req.body;

  Report.create(report)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log('Failed to POST to /api/reports', err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
