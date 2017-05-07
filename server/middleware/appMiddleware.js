const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const config = require('../config/config');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(basicAuth({
    users: { [config.username] : config.password }
  }));
};
