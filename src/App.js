import React, { Component } from 'react';
import './App.css';
import Axios from "axios"
import WorldMap from "./WorldMap"
import "mapbox-gl/dist/mapbox-gl.css"

class App extends Component {
  state= {
    app: []
  }



componentDidMount(){
  Axios.get("http://localhost:3001/api").then(data => console.log(data))


}

  render() {
    return (
      <div className="App">
      <WorldMap />
      </div>

    );
  }
}

export default App;
