"use client";
import { Facebook, Instagram, XIcon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <Box>
      <Box>
        <Typography sx={{ color: "#000" }}>About Pop Plan</Typography>
        <Typography sx={{ color: "#000" }}>
          Discover your next adventure with Poppy, your personalized itinerary
          planner. Whether you’re exploring new cities or revisiting your
          favorite spots, Poppy curates experiences just for you. Let’s make
          your next outing unforgettable.
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Pop-Plan. All rights reserved.
        </Typography>
      </Box>
      <Box>
        <XIcon />
        <Instagram />
        <Facebook />
      </Box>
    </Box>
  );
};
