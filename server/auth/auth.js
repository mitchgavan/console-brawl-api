const config = require('../config/config');

module.exports = function() {
  return function(req, res, next) {

    if (req.headers.authorization === config.secret) {
      next();
    } else {
      console.log('API secret has not been supplied');
      res.status(401).send();
    }

  };
};
