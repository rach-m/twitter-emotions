import React, {
  Component
} from "react";
import "./App.css";
import Axios from "axios";
import WorldMap from "./WorldMap";
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "./Loading"
import {Offline, Online} from "react-detect-offline"
class App extends Component {

  state = {
    emotions: ""
  };



  componentDidMount() {
setInterval(() => {
Axios.get("http://localhost:3001/db").then(tweets => {
  this.setState({
    emotions: tweets.data
  });
}).catch(err => {
  console.log(err)
})
}, 30000);

  }

  render() {
    return <div> <Online > {this.state.emotions !== "" ? < WorldMap data = {
      this.state.emotions
    }
    /> : <WorldMap />}
</Online>
<Offline>Sorry you are offline!</Offline>
</div>
  }
}

export default App;



