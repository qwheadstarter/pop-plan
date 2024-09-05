"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatBox from "../components/ChatBox";
import Places from "../components/Places";
import Map from "../components/Map";

const Chat = () => {
  const [itinerary, setItinerary] = useState(null);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <ChatBox setItinerary={setItinerary} itinerary={itinerary} />
      </Box>
      {/* <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Map />
      </Box> */}
      <Box sx={{ width: 300, padding: 2 }}>
        <Places itinerary={itinerary} />
      </Box>
    </Box>
  );
};

export default Chat;
