const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

const getGreeting = require("./getGreeting");
const getDate = require('./getDate');
const database = require('./database');

// local db example
const games = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const greeting = getGreeting();
  const date = getDate();
  database.logRequest(greeting, date, (err, count) => {
    res.send(`<h1>${greeting}</h1>
      <p>There have been ${count} visits to this page.<p>`);
  });
});

app.get('/games', (req, res) => {
  res.json(games);
});

app.get('/games/:id', (req, res) => {
  const lion = _.find(games, { id: req.params.id });
  res.json(lion || {});
});

app.post('/games', (req, res) => {
  const game = req.body;
  games.push(game);
  res.json(game);
});

app.listen(3000, () => {
  console.log('Console Brawl listening on port 3000!');
})

module.exports = app;
