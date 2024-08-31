import { Star } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  CardContent,
  Container,
} from "@mui/material";
import React from "react";

/*
{
  "places": {
    "1": {
      "destination": "Santa Monica Pier",
      "city": "Los Angeles",
      "state": "California",
      "country": "United States",
      "rating": "4.3",
      "reviews": "697",
      "description": "The Santa Monica Pier is a historic landmark and popular entertainment destination in Santa Monica, California. It features a variety of attractions including an amusement park, an aquarium, and numerous restaurants and shops. The pier offers stunning views of the Pacific Ocean and is a great spot for leisurely walks, picnics, and enjoying the vibrant atmosphere of Santa Monica."
    },
    "2": {
      "destination": "Eiffel Tower",
      "city": "Paris",
      "state": "",
      "country": "France",
      "rating": "4.7",
      "reviews": "12345",
      "description": "The Eiffel Tower is an iconic symbol of Paris and one of the most recognizable structures in the world. Standing at 324 meters tall, it offers breathtaking views of the city from its observation decks. Visitors can enjoy dining in restaurants on the tower and experience its beautiful illumination at night."
    },
    "3": {
      "destination": "Great Wall of China",
      "city": "Beijing",
      "state": "",
      "country": "China",
      "rating": "4.8",
      "reviews": "23456",
      "description": "The Great Wall of China is an ancient fortification that stretches over 13,000 miles. It was originally built to protect Chinese states from invasions and raids. The wall is a UNESCO World Heritage site and a marvel of engineering, offering stunning views and a glimpse into China's rich history."
    }
  }
}

*/

const PreviewCard = () => {
  return (
    <Container>
      <Card
        sx={{
          width: "400px",
          height: "400px",
          position: "relative",
          border: "1px solid black",
          boxShadow: "rgba(255,255,255,0.25",
          borderRadius: "12px",
        }}
      >
        <CardMedia sx={{ width: "100%", height: "100%" }}>
          <img
            src="/assets/smp.jpeg"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </CardMedia>
        <CardContent
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: "16px",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Santa Monica Pier, <br></br>Los Angeles, CA
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Star sx={{ color: "gold", mr: 1 }} />
            <Typography sx={{ color: "#fff" }}> 4.3 (697)</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PreviewCard;
