var express = require('express');
var app = express();

var getGreeting = require("./getGreeting");
var getDate = require('./getDate');
var database = require('./database');

app.get('/', (req, res) => {
  var greeting = getGreeting();
  var date = getDate();
  database.logRequest(greeting, date, (err, count) => {
    res.send(`<h1>${greeting}</h1>
      <p>There have been ${count} visits to this page.<p>`);
  });
});

app.listen(3000, function () {
  console.log('Console Brawl listening on port 3000!');
})

module.exports = app;
