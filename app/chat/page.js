"use client";

import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import MapComponent from "../components/MapComponent";
import Places from "../components/Places";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Chat = () => {
  const [itinerary, setItinerary] = useState(null);

  return (
    <>
      <div className="chat-page">
        {/* Navigation is fixed at the top */}
        <Navigation />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          {/* Adjust the height to account for the Navigation */}
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              marginTop: "64px", // Assuming Navigation height is 64px, adjust if different
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                width: "40%",
                borderRight: "1px solid #ddd",
              }}
            >
              <ChatBox setItinerary={setItinerary} itinerary={itinerary} />
            </Box>
            <Box sx={{ flexGrow: 1, width: "40%" }}>
              <MapComponent itinerary={itinerary} />
            </Box>
            <Box sx={{ width: 300, padding: 0 }}>
              <Places itinerary={itinerary} />
            </Box>
          </Box>
          <Footer />
        </Box>
      </div>
    </>
  );
};

export default Chat;
