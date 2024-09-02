import React, { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ places, center }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        center={center}
        zoom={12}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            position={{ lat: place.location.lat, lng: place.location.lng }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
