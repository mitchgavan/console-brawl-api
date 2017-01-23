module.exports = {
  db: {
    // retro platforms database
    // url: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@ds019063.mlab.com:19063/console-brawl`,
    // recent platforms database
    url: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@ds127389.mlab.com:27389/console-brawl-recent`
  },
  logging: false
};
