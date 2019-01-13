const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const Twitter = require('twitter-lite')
const axios = require('axios')
var sentiment = require('sentimentjs');
var destroy = require('destroy')


const server = express();


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
    const stream = user.stream("statuses/sample")
      .on("start", response => console.log("start"))
      .on("data", tweet => {

        if (tweet.text !== "undefined" && tweet.text !== undefined) {
          info.push(tweet.text)
          console.log(info.length)
        }
        if (info.length === 500) {
          user.stream.destroy()
          let sentimentStringsAnalysis = sentiment.stringsArray(info);
          sentimentStringsAnalysis.stringsWithAnalyses.map((result) => {
            return emotions.push(result.overallResults)

          })
          res.send(emotions)
        }
      })
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error", error))
      .on("end", response => console.log("end"))
  }
  twitterAuth()

})
server.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found!',
  });
})
