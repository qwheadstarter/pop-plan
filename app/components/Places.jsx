import { Star } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import React, { useState, useEffect } from "react";

const Places = ({ itinerary }) => {
  const [placeDetails, setPlaceDetails] = useState([]);
  const [error, setError] = useState(null);

  const fetchPlaceDetails = async (name, address) => {
    try {
      const query = `${name}, ${address}`;
      const response = await fetch(
        `/api/fetchPlaceDetails?address=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching place details: `, error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (itinerary) {
      const fetchAllPlaces = async () => {
        const allDetails = [];
        for (const place of itinerary) {
          const details = await fetchPlaceDetails(place.name, place.address);
          if (details) {
            const filteredPhotos = details.photos
              ? details.photos.filter(
                  (photo) => !photo.photo_reference.includes("random")
                )
              : [];

            details.photos = filteredPhotos;
            allDetails.push(details);
          }
        }
        setPlaceDetails(allDetails);
      };
      fetchAllPlaces();
    }
  }, [itinerary]);

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}

      {placeDetails.length > 0 ? (
        placeDetails.map((place, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              width: "300px",
              height: "400px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {place && place.photos && place.photos.length > 0 ? (
              <CardMedia
                component="img"
                alt={place.name}
                image={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${place.photos[0].photo_reference}&maxwidth=400&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Typography>No image available</Typography>
            )}
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Typography variant="h6">{place.name}</Typography>
              <Typography variant="body2">
                Address: {place.formatted_address || "Address not available"}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Star sx={{ color: "gold", marginLeft: 1 }} />
                <Typography variant="body2" sx={{}}>
                  {place.rating || "No rating"}
                </Typography>

                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({place.user_ratings_total || "No reviews"})
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: "gray" }}>
          No places to display yet.
        </Typography>
      )}
    </div>
  );
};

export default Places;
