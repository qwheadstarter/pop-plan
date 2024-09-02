import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const Map = ({ places }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const center = userLocation || { lat: 37.7749, lng: -122.4194 };

  console.log("Map center:", center);
  console.log("Places data:", places);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        zoom={12}
        center={{
          lat: places.length > 0 ? places[0].coordinates.lat : center.lat,
          lng: places.length > 0 ? places[0].coordinates.lng : center.lng,
        }}
        mapContainerStyle={mapContainerStyle}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.coordinates.lat,
              lng: place.coordinates.lng,
            }}
            label={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
