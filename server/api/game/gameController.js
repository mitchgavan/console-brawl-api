const _ = require('lodash');
const Game = require('./gameModel');
const logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Game.findOne({ 'id': id })
    .exec()
    .then((game) => {
      if (!game) {
        next(new Error('No game with that id'));
      } else {
        req.game = game;
        next();
      }
    })
    .catch((err) => {
      next(err);
    })
};

exports.get = function(req, res, next) {
  Game.find()
    .exec()
    .then((games) => {
      res.json(games);
    })
    .catch((err) => {
      next(err);
    })
};

exports.getOne = function(req, res, next) {
  res.json(req.game);
};

exports.put = function(req, res, next) {
  const game = req.game;
  const update = req.body;

  _.merge(game, update);

  game.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  const newGame = req.body;
  Game.create(newGame)
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    })
};

exports.delete = function(req, res, next) {
  req.game.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  })
};
