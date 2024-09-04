"use client";
import { Facebook, Instagram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#a3a3a3",
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <Box sx={{ maxWidth: "sm" }}>
          <Typography sx={{ color: "#161a1d", fontWeight: "bold" }}>
            About Pop Plan
          </Typography>
          <Typography sx={{ color: "#161a1d", fontSize: "16px" }}>
            Discover your next adventure with Poppy, your personalized itinerary
            planner. Whether you’re exploring new cities or revisiting your
            favorite spots, Poppy curates experiences just for you. Let’s make
            your next outing unforgettable.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <XIcon
            sx={{
              cursor: "pointer",
              color: "#161a1d",
              width: "50px",
              height: "50px",
            }}
          />
          <Instagram
            sx={{
              cursor: "pointer",
              color: "#161a1d",
              width: "50px",
              height: "50px",
            }}
          />
          <Facebook
            sx={{
              cursor: "pointer",
              color: "#161a1d",
              width: "50px",
              height: "50px",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ paddingTop: "1rem" }}>
        <Typography variant="body1" sx={{ color: "#161a1d" }}>
          &copy; {new Date().getFullYear()} Pop-Plan. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
