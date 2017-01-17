const express = require('express');
const app = express();
const api = require('./api/api');
const err = require('./middleware/err');
const config = require('./config/config');

// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);

// setup app middleware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);

// setup global error handling
app.use(err());

module.exports = app;
