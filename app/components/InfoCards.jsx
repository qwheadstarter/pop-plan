import { Box, CardContent, CardMedia, Typography, Card } from "@mui/material";
import React from "react";

const InfoCards = () => {
  const places = [
    {
      name: "Golden Gate Park",
      rating: "4.5",
      reviews: "200",
      image: "/",
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {places.map((place, index) => (
        <Card key={index}>
          <CardMedia
            component="img"
            height="140"
            image="place.image"
            alt={place.name}
          />
          <CardContent>
            <Typography variant="h6">{place.name}</Typography>
            <Typography variant="body2">{place.rating}</Typography>
            <Typography variant="body2">{place.reviews}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default InfoCards;
