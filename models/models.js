const Sequelize = require('sequelize');
let db;

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
 db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true //false
  });
} else {
  // the application is executed on the local machine
  db = new Sequelize('twitter', "rachelmoskowitz", null, {
 dialect: 'postgres',
 logging: true
  });
}

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

  module.exports = {
     db,
    Tweet
  }
