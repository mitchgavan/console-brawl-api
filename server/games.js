const express = require('express');
const gameRouter = express.Router();
const _ = require('lodash');

// local db example
const games = [];

gameRouter.param('id', (req, res, next, id) => {
  const game = _.find(games, { id: parseInt(id) });
  if (game) {
    req.game = game;
    next();
  } else {
    res.send();
  }
});

gameRouter.route('/')
  .get((req, res) => {
    res.json(games);
  })
  .post((req, res) => {
    const game = req.body;
    games.push(game);
    res.json(game);
  });

gameRouter.route('/:id')
  .get((req, res) => {
    const game = req.game;
    res.json(game || {});
  })
  .put((req, res) => {
    const update = req.body;
    if (update.id) delete update.id;

    const game = _.findIndex(games, { id: parseInt(req.params.id) });
    if (!games[game]) {
      res.send();
    } else {
      const updatedGame = _.assign(games[game], update);
      res.json(updatedGame);
    }
  })
  .delete((req, res) => {
    const game = _.findIndex(games, { id: parseInt(req.params.id) });
    if (!games[game]) {
      res.send();
    } else {
      const deletedGame = games[game];
      games.splice(game, 1);
      res.json(deletedGame);
    }
  });

module.exports = gameRouter;
