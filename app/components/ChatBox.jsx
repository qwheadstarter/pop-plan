import { Box, TextField, Typography, Button, Card, CardContent, CircularProgress } from "@mui/material";
import { collection, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase";

const ChatBox = () => {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSatisfied, setIsSatisfied] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getQuizResults();
    }
  }, [user]);

  const getQuizResults = async () => {
    if (!user) return;
    try {
      const quizCollectionRef = collection(db, `users/${user.id}/Quiz Results`);
      const quizSnapshot = await getDocs(quizCollectionRef);
      if (!quizSnapshot.empty) {
        const fetchedQuizResults = [];
        quizSnapshot.forEach((doc) => fetchedQuizResults.push(doc.data()));
        setUserProfile(fetchedQuizResults);
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  const saveItinerary = async () => {
    const name = "Saved Itineraries";
    const userDocRef = doc(collection(db, "users"), user.id);
    const colRef = collection(userDocRef, name);

    await addDoc(colRef, `{itinerary: ${itinerary}}`);
  };

  const getItinerary = async () => {
    if (user) {
      const colRef = collection(doc(collection(db, "users"), user.id), "Saved Itineraries");
      const docSnap = await getDocs(colRef);

      setItinerary(docSnap.data().itinerary)
    }
  };

  const incrementUserPlansGenerated = async () => {
    if (user) {
      const userDocRef = doc(collection(db, "users"), user.id);
      await updateDoc(userDocRef, { plansGenerated: increment(1) });
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt to generate recommendations");
      return;
    }
    setIsLoading(true);
    const updatedConversationHistory = [...conversationHistory, { role: "user", content: prompt }];
    setConversationHistory(updatedConversationHistory);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          conversationHistory: updatedConversationHistory,
          userProfile,
        }),
      });
      
      const data = await response.json();
      const parsedData = JSON.parse(data.response);
      setItinerary(parsedData.itinerary);
      setResponse(parsedData.intro);

      setConversationHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Here's your itinerary! Are you satisfied?" },
      ]);

      setIsSatisfied(true);
      incrementUserPlansGenerated();
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatItinerary = () => {
    if (!itinerary || !Array.isArray(itinerary)) {
      return <Typography variant="body2">No itinerary available.</Typography>;
    }

    return itinerary.map((item, index) => (
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
        { role: "assistant", content: "Great! Enjoy your day!" },
      ]);
      setIsSatisfied(false);
    } else {
      setConversationHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Let's adjust the itinerary. What would you like to change?" },
      ]);
      setIsSatisfied(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 4 }}>
      {/* Chat box section */}
      <Box sx={{ width: "30%", borderRight: "1px solid #ddd", paddingRight: 2 }}>
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
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={isLoading}>
          {isLoading ? "Generating..." : "Send"}
        </Button>

        {/* Move confirmation buttons here */}
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
          formatItinerary()
        ) : (
          <Typography variant="body2" sx={{ color: "gray" }}>Itinerary will be displayed here once generated.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatBox;
