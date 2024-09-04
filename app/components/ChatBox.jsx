import { Box, TextField, Typography, Button, Card, CardContent, CircularProgress } from "@mui/material";
import { collection, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase";

const ChatBox = () => {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");  // Ensure prompt starts empty
  const [itinerary, setItinerary] = useState(null); // Stores the itinerary
  const [conversationHistory, setConversationHistory] = useState([]); // Stores chat history
  const [isLoading, setIsLoading] = useState(false); // Loading indicator
  const [isSatisfied, setIsSatisfied] = useState(false); // Satisfaction flow flag
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

      const quizResultsJSON = JSON.stringify(fetchedQuizResults, null, 2);
      setPrompt("");  // Clear any preset data from the prompt

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
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt to generate recommendations");
      return;
    }
    setIsLoading(true);
    setConversationHistory((prev) => [...prev, { role: "user", content: prompt }]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate recommendations: ${response.statusText}`);
      }

      const data = await response.json();
      const parsedData = JSON.parse(data.response);
      const formattedItinerary = formatItinerary(parsedData);
      setItinerary(formattedItinerary);
      setConversationHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Here's your itinerary! Are you satisfied?" }
      ]);
      setIsSatisfied(true); // Show satisfaction buttons after generating the itinerary
      setResponse(formattedItinerary);
      incrementUserPlansGenerated();
    } catch (error) {
      console.error("Error generating recommendations: ", error);
      alert("An error occurred while generating recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatItinerary = (data) => {
    if (!data.intro || !data.itinerary || !Array.isArray(data.itinerary)) {
      return "Sorry, I couldn't generate an itinerary at the moment.";
    }

    return data.itinerary.map((item, index) => (
      <Card key={index} sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{`${item.time} - ${item.name}`}</Typography>
          <Typography variant="body1">{item.description}</Typography>
          <Typography variant="body2" color="textSecondary">{`Address: ${item.address}`}</Typography>
        </CardContent>
      </Card>
    ));
  };

  const handleConfirmation = (isSatisfied) => {
    if (isSatisfied) {
      setConversationHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Great! Enjoy your day!" }
      ]);
      setIsSatisfied(false);
    } else {
      setConversationHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Let's adjust the itinerary. What would you like to change?" }
      ]);
      setIsSatisfied(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 4 }}>
      {/* Chat box section */}
      <Box sx={{ width: "40%", borderRight: "1px solid #ddd", paddingRight: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Chat with Poppy</Typography>

        <Box sx={{ height: "300px", overflowY: "scroll", mb: 2 }}>
          {conversationHistory.map((message, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: message.role === "user" ? "flex-end" : "flex-start" }}>
              <Card sx={{ backgroundColor: message.role === "user" ? "#1976D2" : "#E0E0E0", color: message.role === "user" ? "#fff" : "#000", mb: 1 }}>
                <CardContent>
                  <Typography variant="body2">{message.content}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
          {isLoading && <CircularProgress size={24} />}
        </Box>

        <TextField
          variant="outlined"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          placeholder="Type your message..." // Ensure prompt starts empty
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={isLoading}>
          {isLoading ? "Generating..." : "Send"}
        </Button>

        {isSatisfied && (
          <Box mt={2}>
            <Typography variant="body1">Are you satisfied with this itinerary?</Typography>
            <Button onClick={() => handleConfirmation(true)} sx={{ mr: 2 }}>Yes</Button>
            <Button onClick={() => handleConfirmation(false)}>No</Button>
          </Box>
        )}
      </Box>

      {/* Itinerary section */}
      <Box sx={{ width: "50%", paddingLeft: 2 }}>
        <Typography variant="h6">Itinerary</Typography>
        {itinerary ? (
          itinerary
        ) : (
          <Typography variant="body2" sx={{ color: "gray" }}>Itinerary will be displayed here once generated.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatBox;
