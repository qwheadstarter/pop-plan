"use client";

import { Box } from "@mui/material";
import React from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatBox from "../components/ChatBox";
import InfoCards from "../components/InfoCards";

const Chat = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexGrow: 2, padding: 2 }}>
        <ChatSidebar />
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <ChatBox />
      </Box>
      <Box sx={{ width: 300, padding: 2 }}>
        <InfoCards />
      </Box>
    </Box>
  );
};

export default Chat;
