const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Twitter = require('twitter-lite');
const Tweet = require("./sequelize")
const axios = require("axios")
const server = express();
// const Config = require('./src/Config')
var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');


server.use(logger('dev'));
// server.use(express.static('public'));
server.use(express.static('./client/build'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

server.get('/', (req, res) => {
  res.send('hello world');

});

server.get('/db', (req, res) => {
  console.log('sanity check')
  Tweet.findAll().then(tweet => res.json(tweet)).then(data => res.send(data))
axios.get('http://localhost:3001/api').then(response => response)
  res.header('Access-Control-Allow-Origin', '*')
});

server.get('/api', (req, res) => {
  let info = [];
  let emotions = [];

  res.header('Access-Control-Allow-Origin', '*')
  const twitterAuth = async () => {
    const user = new Twitter({
      consumer_key: "wPzOwAZvYeYRjAZd4kvPcXu3Q",
      consumer_secret: "ljuzYAgpFBDejFLEl69sjw0NL8o4XgAMtdAC52RGX2WxUO0tmR",
      access_token_key: "1072957393955422218-62cQ7QixhZ6Nu5I30IEP6UsyunFS0a",
      access_token_secret: "bBjiQnyxrulo4dO69JtdO5zGEGMGA0vSWOVSky9MhvRM5"
    });
    const stream = user.stream("statuses/sample", {
        "Cache-Control": "public"
      })
      .on("start", response => console.log("start"))
      .on("data", tweet => {


        if (tweet.text !== "undefined" && tweet.text !== undefined && tweet.coordinates !== null) {
          // console.log(tweet)
          info.push(tweet)

          console.log(tweet.text)
      // translate(tweet.text, {
      //         to: 'en'
      //       }).then(res => {
      //         console.log(res.text)
      //         tweet.text = res.text
      //         //=> I speak English
      //         console.log(res.from.language.iso);
      //         //=> nl
      //       }).catch(err => {
      //         console.error(err);
      //       });

var languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  iam_apikey: 'T2z-AnF_dJnXDD9nPgsG56bEDk1fhVaP_dcP1EN3x4Nx',
  url: 'https://gateway.watsonplatform.net/language-translator/api'
});

let lang = 'en';

var parameters = {
  text: tweet.text,
  source: lang,
  target: 'en'
};



languageTranslator.identify(
  parameters,
  function (error, response) {
    if (error)
      console.log(error)
    else
      lang = JSON.stringify(response, null, 2);
      console.log(lang[0].languages)
      languageTranslator.translate(
        parameters,
        function (error, response) {
          if (error)
            console.log(error)
          else
            console.log(JSON.stringify(response, null, 2));
        }
      );
  }
);


          // axios.post('http://localhost:3001/api', {
          //   tweet: tweet.text,
          //   location: tweet.place.full_name,
          //   latitude: tweet.coordinates.coordinates[0],
          //   longitude: tweet.coordinates.coordinates[1],
          // }).then(response => response).catch(function (error) {
          //   console.log(error.response);
          // });
        }
      })
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error"))
      .on("end", response => console.log("end"))
  }
  twitterAuth()

})


server.post("/api", (req, res) => {
  Tweet.create(req.body)
    .then(tweet => res.json(tweet))
})
server.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found!',
  });
})
