"use client";

import { Box } from "@mui/material";
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import MapComponent from "../components/MapComponent";
import Places from "../components/Places";

const Chat = () => {
  const [itinerary, setItinerary] = useState(null);

  return (
    <div className="chat-page">
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <ChatBox setItinerary={setItinerary} itinerary={itinerary} />
        </Box>
        {/* <Box sx={{ flexGrow: 1, padding: 2 }}>
          <MapComponent itinerary={itinerary} />
        </Box>
        <Box sx={{ width: 300, padding: 0 }}>
          <Places itinerary={itinerary} />
        </Box> */}
      </Box>
    </div>
  );
};

export default Chat;
