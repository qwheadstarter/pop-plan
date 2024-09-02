import { Box, TextField, Typography, Button } from "@mui/material";
import React from "react";

const ChatBox = () => {
  return (
    <Box>
      <Box>
        <Typography variant="body1">
          Poppy: Welcome! How can I help you plan your day?
        </Typography>
      </Box>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Type your message..."
      />
      <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
        Send
      </Button>
    </Box>
  );
};

export default ChatBox;
