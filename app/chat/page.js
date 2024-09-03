"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatBox from "../components/ChatBox";
// import InfoCards from "../components/InfoCards";
// import Map from "../components/Map";

const Chat = () => {
  const [places, setPlaces] = useState([]);

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     try {
  //       const response = await fetch(`/api/generate`);
  //       const data = await response.json();
  //       const extractedData = handleOpenAIResponse(data.response);
  //       setPlaces(extractedData);
  //     } catch (error) {
  //       console.error("Error fetching places: ", error);
  //     }
  //   };

  //   fetchPlaces();
  // }, []);

  const handleOpenAIResponse = (response) => {
    try {
      const jsonResponse = JSON.parse(response);
      const jsonData = JSON.parse(
        jsonResponse.match(/```json\s*([\s\S]*?)\s*```/)[1]
      );
      return jsonData;
    } catch (error) {
      console.error("Error extracting JSON data", error);
      return [];
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <ChatBox />
      </Box>
      {/* <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Map places={places} />
      </Box>
      <Box sx={{ width: 300, padding: 2 }}>
        <InfoCards placesData={places} />
      </Box> */}
    </Box>
  );
};

export default Chat;
