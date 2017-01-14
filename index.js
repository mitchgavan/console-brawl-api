var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send(`<h1>Hello Console Brawl</h1>
    <p>The current time iss ${new Date().toISOString()}<p>`);
});

app.listen(3000, function () {
  console.log('Console Brawl listening on port 3000!');
})

module.exports = app;
