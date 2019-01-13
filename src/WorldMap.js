import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Config from "./Config";
import "mapbox-gl/dist/mapbox-gl.css";

class WorldMap extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100%",
      latitude: 40.7398127,
      longitude: -73.9896502,
      zoom: 2
    }
  };

  render() {
    let pins = this.props.data
    return (
      <div style={{ width: window.innerWidth, height: window.innerHeight }}>
        <ReactMapGL
          style={{ margin: 0, width: 900, position: "absolute" }}
          {...this.state.viewport}
          onViewportChange={viewport =>
            this.setState({
              viewport
            })
          }
          mapboxApiAccessToken={Config.map_key}
          mapStyle={"mapbox://styles/mapbox/streets-v10"}
        >

{pins.map(pin => {

})}
          
        </ReactMapGL>
      </div>
    );
  }
}
export default WorldMap;
