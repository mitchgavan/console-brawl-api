const express = require('express');
const app = express();
const api = require('./api/api');
const err = require('./middleware/err');

// const getGreeting = require("./getGreeting");
// const getDate = require('./getDate');
// const database = require('./database');

// setup app middleware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);

// app.get('/', (req, res) => {
//   const greeting = getGreeting();
//   const date = getDate();
//   database.logRequest(greeting, date, (err, count) => {
//     res.send(`<h1>${greeting}</h1>
//       <p>There have been ${count} visits to this page.<p>`);
//   });
// });

// setup global error handling
app.use(err());

module.exports = app;
