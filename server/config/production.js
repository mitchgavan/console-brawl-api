module.exports = {
  db: {
    url: `mongodb://${process.env.MONGO_USER}:${process.ENV.MONGO_PW}@ds019063.mlab.com:19063/console-brawl`,
  },
  logging: false
};
