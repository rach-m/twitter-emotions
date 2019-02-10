const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Twitter = require("twitter-lite");
const Tweet = require("./models/sequelize");
const axios = require("axios");
const server = express();
// const config = require("./config");
const request = require("request");
const uuidv4 = require("uuid/v4");
const subscriptionKey = process.env.translate_key_1;
const sentiment = require("sentimentjs");
const path = require('path');

if (!subscriptionKey) {
  throw new Error("Environment variable for your subscription key is not set.");
}

server.use(logger("dev"));
// server.use(express.static('public'));
server.use(express.static("./build/"));
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);



server.get("/", (req, res) => {
  res.json("hello world");
});

server.delete("/db", async (req, res) => {
  let dbNum = await Tweet.findAndCountAll().then(response => response.count);
  if (dbNum > 750) {
    Tweet.findAll({
      limit: 1,
      order: [["createdAt", "ASC"]]
    }).then(function(entries) {
      // only difference is that you get users list limited to 1

      console.log("sanity");
      Tweet.destroy({
        where: {
          id: entries[0].dataValues.id
        }
      })
        .then(response => {
          console.log("deleted" + response);
        })
        .catch(err => {
          console.log("error", err);
        });
    });
  } else {
    console.log("not enought data to delete");
  }
});

server.get("/db", (req, res) => {
  let tempArray = [];
  let score = [];
  let tweets = [];
  Tweet.findAll()
    .then(data => {
      return data.map(tweet => {
        tempArray.push(tweet.dataValues.tweet);
        return tweets.push(tweet.dataValues);
      });
    })
    .then(() => {
      let filteredArray = tempArray.filter(
        arr => arr !== null && arr !== "null"
      );
      let sentimentStringsAnalysis = sentiment.stringsArray(filteredArray);
      return sentimentStringsAnalysis;
    })
    .then(sentimentStringsAnalysis => {
      return sentimentStringsAnalysis.stringsWithAnalyses.map(result => {
        return score.push(result.overallResults.score);
      });
    })
    .then(() => {
      return tweets.map((tweet, index) => {
        tweet.score = score[index];
        return tweet.score;
      });
    })
    .then(() => res.send(tweets))
    .catch(err => console.log(err));

  axios.get("http://localhost:3001/api").then(response => response).catch(err => console.log(err));
  res.header("Access-Control-Allow-Origin", "*");
});

server.get("/api", (req, res) => {
  let info = [];
  let translate;
  let parsed;
  let newBody;

  res.header("Access-Control-Allow-Origin", "*");
  const twitterAuth = async () => {
    const user = new Twitter({
      consumer_key: "wPzOwAZvYeYRjAZd4kvPcXu3Q",
      consumer_secret: "ljuzYAgpFBDejFLEl69sjw0NL8o4XgAMtdAC52RGX2WxUO0tmR",
      access_token_key: "1072957393955422218-62cQ7QixhZ6Nu5I30IEP6UsyunFS0a",
      access_token_secret: "bBjiQnyxrulo4dO69JtdO5zGEGMGA0vSWOVSky9MhvRM5"
    });
    const stream = user
      .stream("statuses/sample", {
        "Cache-Control": "public"
      })
      .on("start", response => console.log("start"))
      .on("data", tweet => {
        if (
          tweet.text !== "undefined" &&
          tweet.text !== undefined &&
          tweet.coordinates !== null
        ) {
          info.push(tweet);

          let options = {
            method: "POST",
            baseUrl: "https://api.cognitive.microsofttranslator.com/",
            url: "translate",
            qs: {
              "api-version": "3.0",
              to: "en"
            },
            headers: {
              "Ocp-Apim-Subscription-Key": subscriptionKey,
              "Content-type": "application/json",
              "X-ClientTraceId": uuidv4().toString()
            },
            body: [
              {
                text: tweet.text
              }
            ],
            json: true
          };

          request(options, function(err, res, body) {
            newBody = JSON.stringify(body);
            parsed = JSON.parse(newBody);
            translate = parsed[0].translations[0].text;
          });

          axios
            .post("http://localhost:3001/api", {
              tweet: translate,
              location: tweet.place.full_name,
              latitude: tweet.coordinates.coordinates[0],
              longitude: tweet.coordinates.coordinates[1]
            })
            .then(response => response)
            .then(
              axios
                .delete("http://localhost:3000/db")
                .then(response => response).catch(err => console.log(err))
            )
            .catch(function(error) {
              console.log(error.response);
            });
        }
      })
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error"))
      .on("end", response => console.log("end"));
  };
  twitterAuth();
});

server.post("/api", (req, res) => {
  Tweet.create(req.body).then(tweet => res.json(tweet)).catch(err => console.log(err));
});


server.use("*", (req, res) => {
  res.status(400).json({
    message: "Endpoint not found!"
  });
});

if (process.env.NODE_ENV == "production") {
  server.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
