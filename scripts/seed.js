const {
  Tweet
} = require('../models/sequelize.js')

const main = async () => {

      // delete database
      await Tweet.destroy({
        where: {}
      });



Tweet.create({
  tweet: "Last Sunday🌨 @ Harvard Square - Harvard University https: //t.co/zxbCHQI3rR",
  location: "London, England",
  latitude: "0.14743056",
  longitude: "51.50875556",
})

Tweet.create({
  tweet: "Last Sunday🌨 @ Harvard Square - Harvard University https: //t.co/zxbCHQI3rR",
  location: "London, England",
  latitude: "0.14743056",
  longitude: "51.50875556",
})


Tweet.create({
  tweet: "An afternoon with fellow# Eccentric @DanielLismore capturing the grandeur of my sick - bed, strewn with hand - crafted… https: //t.co/3aEHKrndzE",
  location: "Kleinmachnow, Deutschland",
 latitude: "13.20463882",
   longitude: "52.39758301",
})

Tweet.create({
  tweet: "An afternoon with fellow# Eccentric @DanielLismore capturing the grandeur of my sick - bed, strewn with hand - crafted… https: //t.co/3aEHKrndzE",
  location: "Kleinmachnow, Deutschland",
  latitude: "13.20463882",
  longitude: "52.39758301",
})

Tweet.create({
  tweet: "When buying Apple products in Brazil, you have to buy two: one for yourself and one for your favourite corrupt poli… https: //t.co/cN3MmyFtxj",
  location: "Sorocaba, Brasil",
  latitude: "-47.429687",
  longitude: "-23.4986",
})

Tweet.create({
  tweet: "When buying Apple products in Brazil, you have to buy two: one for yourself and one for your favourite corrupt poli… https: //t.co/cN3MmyFtxj",
  location: "Sorocaba, Brasil",
  latitude: "-47.429687",
  longitude: "-23.4986",
})
}
main()
