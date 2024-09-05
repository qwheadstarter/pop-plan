import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultSanFrancisco = { lat: 37.7749, lng: -122.4194 };

const MapComponent = ({ itinerary }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation(defaultSanFrancisco);
        }
      );
    } else {
      setUserLocation(defaultSanFrancisco);
    }
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const geocodeRequests = itinerary.map(async (place) => {
        const query = `${place.name}, ${place.address}`;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            query
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          return {
            lat: location.lat,
            lng: location.lng,
            title: place.name,
            address: place.address,
          };
        } else {
          return null;
        }
      });

      const results = await Promise.all(geocodeRequests);
      setMarkers(results.filter((marker) => marker !== null));
    };

    if (itinerary && itinerary.length > 0) {
      fetchCoordinates();
    }
  }, [itinerary]);

  useEffect(() => {
    if (isLoaded && mapRef.current && markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) =>
        bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng))
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [isLoaded, markers]);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultSanFrancisco}
        zoom={12}
        onLoad={(map) => (mapRef.current = map)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            label={marker.title}
            onClick={() => setSelectedPlace(marker)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h2>{selectedPlace.title}</h2>
              <p>{selectedPlace.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
