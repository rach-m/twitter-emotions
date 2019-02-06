import React from "react";
import { Marker, Popup } from "react-map-gl";

class Pin extends React.Component {
  state = {
    show: false
  };

  render() {
    let pin;
    let icon;

    if (this.props.score !== undefined) {
      //  console.log(this.props.score)

      if (this.props.score > 0) {
        icon = "happy.svg";
      } else if (this.props.score === 0) {
        icon = "neutral.svg";
      } else {
        icon = "sad.svg";
      }
    }

    this.props.latitude !== undefined
      ? (pin = (
          <div>
            <Marker
              captureClick={false}
              latitude={Number(this.props.longitude)}
              longitude={Number(this.props.latitude)}
              style={{ position: "relative" }}
            >
              <button
              style = {
                {
                  borderWidth: 0,
                  background: "rgba(0, 0, 0, 0)",
                  zIndex: 0
                }
              }
                onClick={() => {
                  this.setState({ show: true });
                }}
              >
                <img
                  alt="map pin"
                  src={require(`./assets/${icon}`)}
                  style={{ height: "25px", width: "25px", zIndex: 0 }}
                />
              </button>
            </Marker>
            {this.state.show ? (
                <Popup
                style = {{zIndex: 5, fontFamily: 'Helvetica', fontSize: 5}}
                  onClose={() => {
                    this.setState({ show: false });
                  }}
                  captureClick={true}
                  closeButton={true}
                  closeOnClick={true}
                  latitude={Number(this.props.longitude)}
                  longitude={Number(this.props.latitude)}
                  tipSize={10}
                >
                  <div> {this.props.tweet}</div>
                </Popup>
              ) : null}
          </div>
        ))
      : (pin = "");

    return <div>{pin}</div>;
  }
}
export default Pin;
