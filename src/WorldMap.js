import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";
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
  componentDidMount(){
    console.log('mounted')
  }

  render() {
    let pins = this.props.data;
    let filteredPins;
    if (pins !== "") {
      filteredPins = pins.filter(
        pin => (pin.score !== undefined) & (pin.score !== null) & (pin.tweet !== "")
      );
    }

    return (
      <div
        style={{
          width: window.innerWidth,
          height: window.innerHeight
        }}
      >
        <ReactMapGL
          style={{
            margin: 0,
            width: 900,
            position: "absolute"
          }}
          {...this.state.viewport}
          onViewportChange={viewport =>
            this.setState({
              viewport
            })
          }
          mapboxApiAccessToken = {
            "pk.eyJ1IjoicmFjaDY3NiIsImEiOiJjanBzc2pybmMxZmhuNGVvMzNvNnhtYW1wIn0.Sfb5UddO-q6W__ZTJs6x1Q"
          }
          // mapStyle={
          //   "mapbox://styles/mapbox/streets-v10"
          // } >
        >
          {pins !== ""
            ? filteredPins.map(pin => {
                let split = pin.score.split(" ");
                let split2 = split[0].split("");

                if (split2[0] === "-") {
                  split2 = Number(split2.splice(0, 2).join(""));
                } else {
                  split2 = Number(split2.splice(0, 1));
                }
                return (
                  <Pin
                    key={pin.id}
                    latitude={pin.latitude}
                    longitude={pin.longitude}
                    score={split2}
                    location={pin.location}
                    tweet={pin.tweet}
                  />
                );
              })
            : null}
        </ReactMapGL>
      </div>
    );
  }
}
export default WorldMap;
