const Sequelize = require('sequelize');
const TweetModel = require("./models/tweet.js")
const sequelize = new Sequelize('twitter', "rachelmoskowitz", null, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const Tweet = TweetModel(sequelize, Sequelize)

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

  module.exports = Tweet
