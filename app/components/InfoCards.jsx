import React, { useState, useEffect } from "react";

const InfoCards = ({ placesData = [] }) => {
  const [detailedPlaces, setDetailedPlaces] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        if (placesData.length > 0) {
          const detailsRequests = placesData.map((place) =>
            fetch(
              `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.placeId}&fields=name,rating,user_ratings_total,photos&key=${apiKey}`
            ).then((response) => response.json())
          );

          const detailsResponses = await Promise.all(detailsRequests);

          const detailedData = detailsResponses.map((response) => {
            const result = response.result;
            return {
              name: result.name,
              rating: result.rating,
              userRatingsTotal: result.user_ratings_total,
              photoUrl: result.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${apiKey}`
                : "placeholder-image-url",
            };
          });

          setDetailedPlaces(detailedData);
        }
      } catch (error) {
        console.error("Error fetching place details: ", error);
      }
    };

    fetchPlaceDetails();
  }, [placesData, apiKey]);

  return (
    <div>
      {detailedPlaces.length > 0 ? (
        detailedPlaces.map((place, index) => (
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
