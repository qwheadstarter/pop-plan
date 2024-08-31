import React, { useEffect, useState } from "react";
//import navigator from "react";

const Geolocation = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div>
            <h1>Your Location</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <p>
                    Latitude: {location.lat} <br />
                    Longitude: {location.lng}
                </p>
            )}
        </div>
    );
};

export default Geolocation;