"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatBox from "../components/ChatBox";
import InfoCards from "../components/InfoCards";
import Map from "../components/Map";

const Chat = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("/api/get-places"); // Adjust this endpoint as needed
        const data = await response.json();
        setPlaces(data.itinerary || []); // Adjust according to the response structure
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <ChatBox setPlaces={setPlaces} /> {/* Pass `setPlaces` if needed */}
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Map places={places} />
      </Box>
      <Box sx={{ width: 300, padding: 2 }}>
        <InfoCards placesData={places} />
      </Box>
    </Box>
  );
};

export default Chat;
