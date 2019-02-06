const Sequelize = require('sequelize');
const TweetModel = require("./models/tweet.js")
const sequelize = new Sequelize("process.env.DATABASE_URL || 'postgres://localhost:5432/twitter'", 'rachelmoskowitz', null, {
  dialect: 'postgres'
});

const Tweet = TweetModel(sequelize, Sequelize)

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

  module.exports = Tweet
