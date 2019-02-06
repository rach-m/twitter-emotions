const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL,{
  dialect: 'postgres'
});

db.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

  const Tweet = db.define('tweets', {
    id: {
      type: db.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tweet:{
    type: db.TEXT,
    },
    location:{
      type: db.TEXT,
    },
    latitude: {
      type: db.TEXT
    },
    longitude: {
      type: db.TEXT
    }
  })

  module.exports = {
    Tweet,
    db
  }
