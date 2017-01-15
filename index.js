const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const gameRouter = require('./games');

const getGreeting = require("./getGreeting");
const getDate = require('./getDate');
const database = require('./database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/games', gameRouter);

app.get('/', (req, res) => {
  const greeting = getGreeting();
  const date = getDate();
  database.logRequest(greeting, date, (err, count) => {
    res.send(`<h1>${greeting}</h1>
      <p>There have been ${count} visits to this page.<p>`);
  });
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log('Console Brawl listening on port 3000!');
})

module.exports = app;
