import React, {
  Component
} from "react";
import "./App.css";
import Axios from "axios";
import WorldMap from "./WorldMap";
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "./Loading"
class App extends Component {

  state = {
    emotions: ""
  };



  componentDidMount() {
    Axios.get("/db").then(tweets => {

      this.setState({
        emotions: tweets.data
      });
    }).catch(err => {
      console.log(err)
    })
// setInterval(() => {
// Axios.get("/db").then(tweets => {
//   this.setState({
//     emotions: tweets.data
//   });
// }).catch(err => {
//   console.log(err)
// })
// }, 30000);

  }

  render() {
    return <div> {this.state.emotions !== "" ? < WorldMap data = {
      this.state.emotions
    }
    /> : <Loading />}
</div>
  }
}

export default App;



