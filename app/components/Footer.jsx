"use client";
import { Facebook, Instagram, Email } from "@mui/icons-material";
import TikTokIcon from "@mui/icons-material/MusicNote"; // TikTok icon replacement
import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  // Function to handle social icon clicks
  const handleIconClick = (url) => {
    window.open(url, "_blank");
  };

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
          <Box sx={{ height: "6px" }} /> {/* 2px buffer */}
          <Typography sx={{ color: "#ffffff", fontSize: "16px" }}>
            Discover your next adventure with Pop-Plan&apos;s AI assistant, Poppy, your personalized itinerary
            planner. Get more out of your downtime with an adventure just for
            you. Pop-Plan is perfect for exploring near home on your day off or
            while you&apos;re visiting your next travel destination. Poppy
            instantly curates experiences just for you, leaving you with more
            free time to enjoy your day instead of planning it. Let Poppy make
            your next outing unforgettable.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <TikTokIcon
            sx={{
              cursor: "pointer",
              color: "#ffffff",
              width: "50px",
              height: "50px",
            }}
            onClick={() =>
              handleIconClick("https://www.tiktok.com/@pop_plan")
            }
          />
          <Instagram
            sx={{
              cursor: "pointer",
              color: "#ffffff",
              width: "50px",
              height: "50px",
            }}
            onClick={() =>
              handleIconClick(
                "https://www.instagram.com/pop_plan_ai?igsh=MWF3bXF3cWpzNHF0ZQ=="
              )
            }
          />
          <Facebook
            sx={{
              cursor: "pointer",
              color: "#ffffff",
              width: "50px",
              height: "50px",
            }}
            onClick={() =>
              handleIconClick(
                "https://www.facebook.com/profile.php?id=61565035156831&sk=about"
              )
            }
          />
          <Email
            sx={{
              cursor: "pointer",
              color: "#ffffff",
              width: "50px",
              height: "50px",
            }}
            onClick={() =>
              handleIconClick("mailto:pop.plan.helpdesk@gmail.com")
            }
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