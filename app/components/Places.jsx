import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import { Star } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

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
    <div style={{ height: "100%", position: "relative" }}>
      {error && <Typography color="error">{error}</Typography>}
      {placeDetails.length > 0 ? (
        <Swiper
          direction="vertical"
          spaceBetween={-50}
          slidesPerView={2}
          style={{ height: "100%" }}
        >
          {placeDetails.map((place, index) => (
            <SwiperSlide key={index} style={{ height: "300px" }}>
              <Card
                sx={{
                  mt: 2,
                  ml: 3,
                  width: "250px",
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
                    Address:{" "}
                    {place.formatted_address || "Address not available"}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Star sx={{ color: "gold", mr: 0.5 }} />
                    <Typography variant="body2">
                      {place.rating || "No rating"}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({place.user_ratings_total || "No reviews"})
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            color: "#B4B4B4",
            textAlign: "center",
          }}
        >
          No places to display yet.
        </Typography>
      )}
    </div>
  );
};

export default Places;
