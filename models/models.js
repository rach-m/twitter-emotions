const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'twitter', "rachelmoskowitz", null, {
  dialect: 'postgres'
});

db.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

  const Tweet = db.define('tweets', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tweet:{
    type: Sequelize.TEXT,
    },
    location:{
      type: Sequelize.TEXT,
    },
    latitude: {
      type: Sequelize.TEXT
    },
    longitude: {
      type: Sequelize.TEXT
    }
  })

  console.log(Tweet.findAll())

  module.exports = {
     db,
    Tweet
  }
