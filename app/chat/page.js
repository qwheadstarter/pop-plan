"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatBox from "../components/ChatBox";
import InfoCards from "../components/InfoCards";
import Map from "../components/Map";
import fetchPlaces from "../api/fetchPlaces";

const Chat = () => {
  // const [places, setPlaces] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const query = "Recommended places: ";
  //     const results = await fetchPlaces(query);
  //     setPlaces(results);
  //   };
  //   fetchData();
  // }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 2, padding: 2 }}>
        <ChatSidebar />
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <ChatBox />
      </Box>
      {/* <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Map places={places} />
      </Box> */}
      {/* <Box sx={{ width: 300, padding: 2 }}>
        <InfoCards places={places} />
      </Box> */}
    </Box>
  );
};

export default Chat;
