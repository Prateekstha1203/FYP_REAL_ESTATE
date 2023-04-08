import React from "react";
import GoogleMapReact from "google-map-react";

const Map = ({ lat, lng }) => {
  const defaultCenter = {
    lat: lat,
    lng: lng,
  };

  const defaultZoom = 14;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "YOUR_API_KEY" }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
