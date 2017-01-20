const express = require('express');
const app = express();
const mongoose = require('mongoose');
const api = require('./api/api');
const err = require('./middleware/err');
const config = require('./config/config');

// use native promises
mongoose.Promise = global.Promise;

// db.url is different depending on NODE_ENV
mongoose.connect(config.db.url);

// setup app middleware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);

// setup global error handling
app.use(err());

// export the app for testing
module.exports = app;
