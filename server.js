const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const Twitter = require('twitter-lite')
const axios = require('axios')
var sentiment = require('sentimentjs');


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
        });
        const response = await user.getBearerToken();
        const app = new Twitter({
          bearer_token: response.access_token
        })
        axios.get('/trends/place?id=1', {
          baseURL: 'https://api.twitter.com/1.1',
          headers: {
            Authorization: `Bearer ${app.config.bearer_token}`
          }
        }).then(data => {
          // console.log(data)
           data.data[0].trends.map(tag => {
             let pound = /#/
            let str = tag.name.replace(pound, '%23')
            let oneWordStr = str.replace(/ /g, '')
            // console.log(str)

               axios.get("/search/tweets.json?q=" + oneWordStr + "&result_type=popular&lang=en", {
                  baseURL: "https://api.twitter.com/1.1",
                  headers: {
                    Authorization: `Bearer ${app.config.bearer_token}`
                  }
                })
                .then((strs) => {
                 if (strs.data.statuses !== []){
                   strs.data.statuses.map(tweet => {
                     info.push(tweet.text)
                      let sentimentStringsAnalysis = sentiment.stringsArray(info);

                      sentimentStringsAnalysis.stringsWithAnalyses.map((result) => {
                        return emotions.push(result.overallResults)

                      })
                      return (emotions)
                   })
                 }
                 res.send(emotions)
                  }).catch(function (error) {
                  console.log(error)

                })

          })})
      }
       twitterAuth()
    })
    server.use('*', (req, res) => {
        res.status(400).json({
          message: 'Endpoint not found!',
        });
      })
