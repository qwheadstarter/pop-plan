"use client";
import { Facebook, Instagram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#1A1E26",
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
          <Typography sx={{ color: "#ffffff", fontWeight: "bold" }}>
            About Pop-Plan
          </Typography>
          <Typography sx={{ color: "#ffffff", fontSize: "16px" }}>
            Discover your next adventure with Poppy, your personalized itinerary
            planner. Get more out of your downtime with an adventure just for
            you. Pop-Plan is perfect for exploring near home on your day off or
            while you&apos;re visiting your next travel destination. Poppy
            instantly curates experiences just for you, leaving you with more
            free time to enjoy your day instead of planning it. Let Poppy make
            your next outing unforgettable
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <XIcon
            sx={{
              cursor: "pointer",
              color: "#ffffff",
              width: "50px",
              height: "50px",
            }}
          />
          <Instagram
            sx={{
              cursor: "pointer",
              color: "#ffffff",
              width: "50px",
              height: "50px",
            }}
          />
          <Facebook
            sx={{
              cursor: "pointer",
              color: "#ffffff",
              width: "50px",
              height: "50px",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ paddingTop: "1rem" }}>
        <Typography variant="body1" sx={{ color: "#ffffff" }}>
          &copy; {new Date().getFullYear()} Pop-Plan. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
