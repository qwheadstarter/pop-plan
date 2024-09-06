import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  updateDoc,
  increment,
} from "firebase/firestore";
import getStripe from "@/utils/get-stripe";
import { useRouter } from "next/navigation";

const ChatBox = ({ itinerary, setItinerary }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [conversationHistory, setConversationHistory] = useState([
    { role: "assistant", content: "Welcome! I’m Poppy, your personal assistant. How can I help you plan your perfect day today?" }
  ]); 
  const [userProfile, setUserProfile] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [plansGenerated, setPlansGenerated] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSatisfied, setIsSatisfied] = useState(false);
  const [itineraryName, setItineraryName] = useState("");
  const [accordionExpanded, setAccordionExpanded] = useState(true);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const handleOpenSaveDialog = () => setSaveDialogOpen(true);
  const handleCloseSaveDialog = () => setSaveDialogOpen(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const handleOpenUpgradeDialog = () => setUpgradeDialogOpen(true);
  const handleCloseUpgradeDialog = () => setUpgradeDialogOpen(false);

  useEffect(() => {
    if (user) {
      getQuizResults();
      getIsPremiumUser();
      getUserPlansGenerated();
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
    if (!itineraryName.trim()) {
      alert("Please enter a name for your itinerary.");
      return;
    }

    if (!user || !isSignedIn) {
      alert("You must be logged in to save itineraries.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const colRef = collection(userDocRef, "Saved Itineraries");

      await setDoc(doc(colRef, itineraryName), { itinerary: itinerary });

      alert("Itinerary saved successfully");
      handleCloseSaveDialog();
      setItineraryName("");
    } catch (error) {
      console.error("Error saving itinerary:", error);
      alert("An error occurred while saving your itinerary. Please try again.");
    }
  };

  const getIsPremiumUser = async () => {
    if (user) {
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);

      setIsPremiumUser(docSnap.data().isPremiumUser);
    }
  };

  const getUserPlansGenerated = async () => {
    if (user) {
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);

      setPlansGenerated(docSnap.data().plansGenerated);
    }
  };

  const incrementUserPlansGenerated = async () => {
    setPlansGenerated(plansGenerated + 1);
    if (user) {
      const userDocRef = doc(collection(db, "users"), user.id);
      await updateDoc(userDocRef, { plansGenerated: increment(1) });
    }
  };

  const handleSubmit = async () => {
    if (!user || !isSignedIn) {
      alert("You must be logged in to Chat with Poppy.");
      return;
    }

    if (plansGenerated >= 5 && !isPremiumUser) {
      handleOpenUpgradeDialog()
      return;
    }
    if (!prompt.trim()) {
      alert("Please enter a prompt to generate recommendations");
      return;
    }
    setIsLoading(true);
    const updatedConversationHistory = [
      ...conversationHistory,
      { role: "user", content: prompt },
    ];
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
      // console.log("data", data);
      const parsedData = JSON.parse(data.response);
      setItinerary(parsedData.itinerary);
      setResponse(parsedData.intro);

      setConversationHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Here's your itinerary! Are you satisfied?",
        },
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
      return (
        <Typography variant="body2" sx={{ color: "#B4B4B4" }}>
          No itinerary available.
        </Typography>
      );
    }

    return itinerary.map((item, index) => (
      <Card key={index} sx={{ bgcolor: "#2D3339", width: "500px", mb: 2 }}>
        <CardContent sx={{ color: "#B4B4B4" }}>
          <Typography
            variant="h6"
            sx={{ mb: 1 }}
          >{`${item.time} - ${item.name}`}</Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {item.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "600" }}
          >{`Address: ${item.address}`}</Typography>
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
        {
          role: "assistant",
          content: "Let's adjust the itinerary. What would you like to change?",
        },
      ]);
      setIsSatisfied(false);
    }
  };

  const handleAccordionChange = () => {
    setAccordionExpanded(!accordionExpanded);
  };

  const handleCheckout = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });

    const checkoutSessionJson = await checkoutSession.json();
    console.log(checkoutSessionJson);

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSessionJson.message);
      return;
    }

    console.log(checkoutSessionJson.id);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  // Redirect to sign-in page if user is not logged in
  if (isLoaded && !isSignedIn) {
    router.push("/sign-in");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 4,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Chat box section */}
        <Box
          sx={{
            width: "100%",
            // borderRight: "1px solid #ddd",
            paddingRight: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "#B4B4B4" }}>
            Chat with Poppy
          </Typography>

          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
            {conversationHistory.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Card
                  sx={{
                    backgroundColor:
                      message.role === "user" ? "#1976D2" : "#E0E0E0",
                    color: message.role === "user" ? "#fff" : "#000",
                    mb: 1,
                  }}
                >
                  <CardContent>
                    <Typography variant="body2">{message.content}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
            {isLoading && <CircularProgress size={24} />}

            {/* Itinerary section */}
            {itinerary && (
              <Box sx={{ mt: 2 }}>
                <Accordion
                  expanded={accordionExpanded}
                  onChange={handleAccordionChange}
                  sx={{
                    bgcolor: "#1B1E22",
                    width: "550px",
                    height: "auto",
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreOutlined sx={{ color: "#fff" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography sx={{ color: "#fff" }}>
                      {accordionExpanded ? "Close Itinerary" : "View Itinerary"}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Box>{formatItinerary()}</Box>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenSaveDialog}
                    >
                      Save Itinerary
                    </Button>

                    {/* Save Itinerary Dialog */}
                    <Dialog
                      open={saveDialogOpen}
                      sx={{
                        ".MuiDialog-paper": {
                          bgcolor: "#212529",
                          color: "#B4B4B4",
                        },
                      }}
                      onClose={handleCloseSaveDialog}
                    >
                      <DialogTitle>Save Itinerary</DialogTitle>
                      <DialogContent>
                        <DialogContentText sx={{ color: "#B4B4B4" }}>
                          Please enter a name for your itinerary.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Itinerary Name"
                          type="text"
                          fullWidth
                          value={itineraryName}
                          onChange={(e) => setItineraryName(e.target.value)}
                          sx={{
                            bgcolor: "#40474f",
                            ".MuiInputBase-input": {
                              color: "#fff",
                            },
                          }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseSaveDialog}
                          sx={{
                            bgcolor: "#1976D2",
                            color: "#fff",
                            "&:hover": {
                              bgcolor: "#0083E0",
                              color: "#fff",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={saveItinerary}
                          sx={{
                            bgcolor: "#1976D2",
                            color: "#fff",
                            "&:hover": {
                              bgcolor: "#0083E0",
                              color: "#fff",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}

            {isSatisfied && (
              <Box mt={2}>
                <Typography variant="body1" sx={{ mb: 1, color: "#B4B4B4" }}>
                  Are you satisfied with this itinerary?
                </Typography>
                <Button
                  onClick={() => handleConfirmation(true)}
                  sx={{
                    width: "50px",
                    height: "30px",
                    bgcolor: "#1976D2",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#0083E0",
                      color: "#fff",
                    },
                    mr: 2,
                  }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => handleConfirmation(false)}
                  sx={{
                    width: "50px",
                    height: "30px",
                    bgcolor: "#1976D2",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#0083E0",
                      color: "#fff",
                    },
                  }}
                >
                  No
                </Button>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "auto",
            }}
          >
            <TextField
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              fullWidth
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              sx={{
                mb: 2,
                ".MuiInputBase-input": {
                  bgcolor: "#40474F",
                  color: "#fff",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Send"}
            </Button>
            {/* Upgrade to Premium Dialog */}
            <Dialog
              open={upgradeDialogOpen}
              sx={{
                ".MuiDialog-paper": {
                  bgcolor: "#212529",
                  color: "#B4B4B4",
                },
              }}
              onClose={handleCloseUpgradeDialog}
            >
              <DialogTitle>Upgrade to Premium</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ color: "#B4B4B4" }}>
                  You have reached the limit for free itineraries.
                  Upgrade to the Explorer plan for unlimited plans for $10 / month!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCheckout}
                  sx={{
                    bgcolor: "#1976D2",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#0083E0",
                      color: "#fff",
                    },
                  }}
                >
                  Uprade Now
                </Button>
                <Button
                  onClick={handleCloseUpgradeDialog}
                  sx={{
                    bgcolor: "#1976D2",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#0083E0",
                      color: "#fff",
                    },
                  }}
                >
                  Exit
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
