import { Box, TextField, Typography, Button } from "@mui/material";
import { collection, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase";

const ChatBox = () => {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("Fetching quiz results for user ID:", user.id);
      getQuizResults();
    }
  }, [user]);

  const getQuizResults = async () => {
    if (!user) return;

    try {
      const quizCollectionRef = collection(db, `users/${user.id}/Quiz Results`);
      const quizSnapshot = await getDocs(quizCollectionRef);

      if (quizSnapshot.empty) {
        console.log("No quiz results found for this user.");
        return;
      }

      const fetchedQuizResults = [];
      quizSnapshot.forEach((doc) => {
        const quizData = doc.data();
        fetchedQuizResults.push(quizData);
      });

      console.log("Fetched Quiz Results:", fetchedQuizResults);

      const quizResultsJSON = JSON.stringify(fetchedQuizResults, null, 2);
      console.log("Formatted Quiz Results JSON:", quizResultsJSON);
    } catch (error) {
      console.error("Error fetching quiz results: ", error);
    }
  };

  const incrementUserPlansGenerated = async () => {
    if (!user) return;

    const userDocRef = doc(collection(db, "users"), user.id);

    await updateDoc(userDocRef, {
      plansGenerated: increment(1)
    });
  }

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt to generate recommendations");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to generate recommendations: ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("Received Data from API:", data);

      // Parse and format the itinerary data
      const formattedResponse = formatItinerary(data);
      setResponse(formattedResponse);

      incrementUserPlansGenerated();
    } catch (error) {
      console.error("Error generating recommendations: ", error);
      alert(
        "An error occurred while generating recommendations. Please try again."
      );
    }
  };

  const formatItinerary = (data) => {
    if (!data.intro || !data.itinerary || !Array.isArray(data.itinerary)) {
      return "Sorry, I couldn't generate an itinerary at the moment.";
    }

    let formattedItinerary = `${data.intro}\n\n`;

    data.itinerary.forEach((item, index) => {
      formattedItinerary += `${index + 1}. **${item.time} - ${item.name}**\n`;
      formattedItinerary += `   ${item.description}\n`;
      formattedItinerary += `   - **Address:** ${item.address}\n\n`;
    });

    return formattedItinerary;
  };

  return (
    <Box maxWidth="sm">
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
