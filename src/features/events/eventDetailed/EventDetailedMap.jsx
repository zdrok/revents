import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

function Marker() {
  return <Icon name='Maker' size='big' color='red' />;
}

export default function EventDetailedMap({ latLng }) {
  let zoom = 14;
  console.log(latLng)
 return <Segment attached='bottom' style={{ padding: 0 }}>
    <div className='' style={{ height: 300, width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDXHm6l09ODFvRGxx1089d4KA1D5EcEH8Y" }}
        center={latLng}
        zoom={zoom}
      >
        <Marker lat={latLng.lat} lng={latLng.lng} />
      </GoogleMapReact>
    </div>
  </Segment>;
}
