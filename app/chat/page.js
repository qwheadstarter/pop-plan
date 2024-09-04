"use client";

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatBox from "../components/ChatBox";
import InfoCards from "../components/InfoCards";
import Map from "../components/Map";

const Chat = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <ChatBox />
      </Box>
      {/* <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Map />
      </Box> */}
      <Box sx={{ width: 300, padding: 2 }}>
        <InfoCards />
      </Box>
    </Box>
  );
};

export default Chat;
