module.exports = {
  db: {
    url: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_DB_URL}`
  },
  logging: false
};
