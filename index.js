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

app.param('id', (req, res, next, id) => {
  const game = _.find(games, { id: parseInt(id) });
  if (game) {
    req.game = game;
    next();
  } else {
    res.send();
  }
});

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
  const game = req.game;
  res.json(game || {});
});

app.post('/games', (req, res) => {
  const game = req.body;
  games.push(game);
  res.json(game);
});

app.put('/games/:id', (req, res) => {
  const update = req.body;
  if (update.id) delete update.id;

  const game = _.findIndex(games, { id: parseInt(req.params.id) });
  if (!games[game]) {
    res.send();
  } else {
    const updatedGame = _.assign(games[game], update);
    res.json(updatedGame);
  }
});

app.delete('/games/:id', (req, res) => {
  const game = _.findIndex(games, { id: parseInt(req.params.id) });
  if (!games[game]) {
    res.send();
  } else {
    const deletedGame = games[game];
    games.splice(game, 1);
    res.json(deletedGame);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log('Console Brawl listening on port 3000!');
})

module.exports = app;
