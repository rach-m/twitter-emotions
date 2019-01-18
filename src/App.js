import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import WorldMap from "./WorldMap";
import "mapbox-gl/dist/mapbox-gl.css";
const sentiment = require("sentimentjs");

class App extends Component {
  state = {
    emotions: []
  };

  componentDidMount() {
    let tweets = [];
    let tempArray = [];
    let sentimentStringsAnalysis;
    let score = [];
    Axios.get("http://localhost:3001/db").then(data => {
      data.data.map(tweet => {
        tempArray.push(tweet.tweet);
        return tweets.push(tweet);
      });
      tweets.map(tweet => {
        return sentimentStringsAnalysis = sentiment.stringsArray(tempArray);
      });

      sentimentStringsAnalysis.stringsWithAnalyses.map(result => {
        return score.push(result.overallResults.score)
      });

      tweets.map( (tweet, index) => {
      return tweet.tweet = score[index]
      })

      this.setState({
        emotions: tweets
      });

    });
  }

  render() {

    return (
      <div className="App">
        <WorldMap data={this.state.emotions} />
      </div>
    );
  }
}

export default App;
