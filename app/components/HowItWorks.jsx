"use client";

import {
  ExploreOutlined,
  MapOutlined,
  Quiz,
  QuizOutlined,
} from "@mui/icons-material";
import { Card, CardContent, Typography, Box } from "@mui/material";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="how-container">
      <Typography
        variant="h3"
        sx={{ mt: 3, textAlign: "center", color: "#46515A", fontWeight: 500 }}
      >
        Getting Started With Poppy
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "left",
          gap: "2rem",
          mt: "2rem",
        }}
      >
        <Card
          sx={{
            border: "none",
            borderRadius: "8px",
            width: "500px",
            height: "260px",
            bgcolor: "#ffffff",
            color: "#46515a",
            boxShadow:
              "rgba(99, 93, 93, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QuizOutlined sx={{ width: "50px", height: "50px" }} gutterBottom />
            <Typography variant="h4" gutterBottom>
              Take the Quiz
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" gutterBottom>
                Answer a quick quiz so Poppy can learn your preferences.
              </Typography>
              <Typography variant="h5">
                Poppy uses this to create a tailored itinerary just for you.
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            border: "none",
            borderRadius: "8px",
            width: "500px",
            height: "260px",
            bgcolor: "#ffffff",
            color: "#46515a",
            boxShadow:
              "rgba(99, 93, 93, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ExploreOutlined
              sx={{ width: "50px", height: "50px" }}
              gutterBottom
            />
            <Typography variant="h4" gutterBottom>
              Pick Your Adventure
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5" gutterBottom>
                View personalized day plans based on your quiz results.
              </Typography>
              <Typography variant="h5">
                Pick the plan that excites you the most!
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            border: "none",
            borderRadius: "8px",
            width: "500px",
            height: "260px",
            bgcolor: "#ffffff",
            color: "#46515a",
            boxShadow:
              "rgba(99, 93, 93, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MapOutlined sx={{ width: "50px", height: "50px" }} gutterBottom />
            <Typography variant="h4" gutterBottom>
              Map Your Day
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" gutterBottom>
                Use Poppy’s map to see your chosen spots.
              </Typography>
              <Typography variant="h5">
                Easily navigate or ask Poppy for changes anytime.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default HowItWorks;
