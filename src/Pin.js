import React from "react";
import { Marker, Popup } from "react-map-gl";

class Pin extends React.Component {
  render() {
    let pin;
    let icon;

   if( this.props.tweet !== undefined) {
     console.log(this.props.tweet)


     if (this.props.tweet > 0){
       icon = "happy.svg";
     }
     else if (this.props.tweet === 0){
       icon = "neutral.svg"
     }
     else{
       icon = "sad.svg"
     }
    }

    this.props.latitude !== undefined
      ? (pin = (
          <div>
            <Marker
              latitude={Number(this.props.longitude)}
              longitude={Number(this.props.latitude)}
              style={{ position: "relative" }}
            >
              <img
                alt="map pin"
                src={require(`./assets/${icon}`)}
                style={{ height: "30px", width: "30px" }}
              />
            </Marker>
            {/* <Popup
              latitude={
      Number(this.props.longitude)
        }
        longitude={
          Number(this.props.latitude)

        }
        tipSize={
          5
        }
        anchor="top"
        closeOnClick={
          true
        } >
        <div > Hiya </div>
      </Popup> */}
          </div>
        ))
      : (pin = "");

    return pin;
  }
}
export default Pin;
