module.exports = (sequelize, type) => {
  return sequelize.define('tweets', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tweet: type.TEXT,
    location: type.TEXT,
    latitude: type.TEXT,
    longitude: type.TEXT,
  })
}
