import { Star } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const InfoCards = () => {
  const [address, setAddress] = useState("");
  const [placeDetails, setPlaceDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch(
        `/api/fetchPlaceDetails?address=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      setPlaceDetails(data);
    } catch (error) {
      console.error(`Error fetching place details: `, error);
      setError(error.message);
    }
  };

  return (
    <div>
      <TextField
        value={address}
        onChange={handleAddressChange}
        fullWidth
        placeholder="Enter an address"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {placeDetails && (
        <Card>
          {placeDetails.photos && placeDetails.photos.length > 0 ? (
            <CardMedia
              component="img"
              alt={placeDetails.name}
              image={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${placeDetails.photos[0].photo_reference}&maxwidth=400&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
            />
          ) : (
            <Typography>No image available</Typography>
          )}
          <CardContent>
            <Typography variant="h6">{placeDetails.name}</Typography>
            <Typography variant="body2">
              Address: {placeDetails.formatted_address}
            </Typography>
            <Typography variant="body2">Rating:</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2">{placeDetails.rating}</Typography>
              <Star sx={{ marginLeft: 1 }} />
            </Box>
            <Typography variant="body2">
              Reviews: {placeDetails.user_ratings_total}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InfoCards;
