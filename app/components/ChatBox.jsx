import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";

const ChatBox = () => {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt to generate recommendations");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: prompt,
      });
      if (!response.ok) {
        throw new Error(
          `Failed to generate recommendations: ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("Received data:", data);
      setResponse(data.response || "");
    } catch (error) {
      console.error("Error generating recommendations: ", error);
      alert(
        "An error occurred while generating recommendations. Please try again."
      );
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="body1">
          Poppy: Welcome! How can I help you plan your day?
        </Typography>
      </Box>
      <TextField
        variant="outlined"
        onChange={(e) => setPrompt(e.target.value)}
        fullWidth
        placeholder="Type your message..."
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handleSubmit}
      >
        Send
      </Button>

      {response && (
        <Box mt={2}>
          <Typography variant="body1">{response}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
