import React, {
  Component
} from 'react';
import './App.css';
import Axios from "axios"
import WorldMap from "./WorldMap"
import "mapbox-gl/dist/mapbox-gl.css"

class App extends Component {
  state = {
    emotions: []
  }



  componentDidMount() {
    Axios.get("http://localhost:3001/api").then(data => {
    this.setState({
emotions: data
    })

  })

}

  render() {
    return ( <div className = "App">
      <WorldMap data = {this.state.emotions} / >
      </div>

    );
  }
}

export default App;
