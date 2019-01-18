import React, {
  Component
} from "react";
import ReactMapGL from "react-map-gl";
import Config from "./Config";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from './Pin'

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
    let pins = this.props.data;
    return <div style={
      {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }>
      <ReactMapGL
        style={
          {
            margin: 0,
            width: 900,
            position: "absolute"
          }
        } {...this.state.viewport
        }
        onViewportChange={
          viewport =>
            this.setState({
              viewport
            })
        }
        mapboxApiAccessToken={
          Config.map_key
        }
        mapStyle={
          "mapbox://styles/mapbox/streets-v10"
        } >
        {
        } {
          pins.map(pin => {
            let split = pin.tweet.split(' ')
            let split2 = split[0].split('')

            if (split2[0] === "-") {
              split2 = Number(split2.splice(0, 2).join(""))
            } else {
              split2 = Number(split2.splice(0, 1))
            }
           return  <Pin key = {pin.id} latitude = {pin.latitude} longitude = {pin.longitude} tweet = {split2} location = {pin.location} />
      })
        } </ReactMapGL> </div>
  }
}
export default WorldMap;
