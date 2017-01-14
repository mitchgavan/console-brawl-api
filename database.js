var MongoClient = require("mongodb").MongoClient;
var username = process.env.MONGO_USER;
var password = process.env.MONGO_PW;
var url = `mongodb://${username}:${password}@ds019063.mlab.com:19063/console-brawl`;

var logRequest = function(greeting, timestamp, db, callback) {
  db.collection('visits')
    .insertOne({
      greeting: greeting,
      timestamp: timestamp
    }, (err, result) => {
      if (err) { return callback(err); }
      db.collection('visits')
        .count()
        .then(function(visits) {
          callback(null, visits);
        });
    });
}

module.exports = {
  logRequest: function(greeting, timestamp, cb) {
    MongoClient.connect(url, function(err, db) {
      logRequest(greeting, timestamp, db, function(err, result) {
          db.close();
          cb(err, result);
      });
    });
  }
};
