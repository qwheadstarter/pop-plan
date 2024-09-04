import React, { useState, useEffect } from "react";

const InfoCards = () => {
  const [placeDetails, setPlaceDetails] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  return (
    <div>
      {placeDetails.length > 0 ? (
        placeDetails.map((place, index) => (
          <div key={index} className="place-card">
            <img src={place.photoUrl} alt={place.name} />
            <h3>{place.name}</h3>
            <p>
              Rating: {place.rating} ({place.userRatingsTotal} reviews)
            </p>
          </div>
        ))
      ) : (
        <p>No places available</p>
      )}
    </div>
  );
};

export default InfoCards;
