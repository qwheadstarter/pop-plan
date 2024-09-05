// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CircularProgress,
//   Container,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   TextField,
//   Typography,
// } from "@mui/material";
// import {
//   collection,
//   doc,
//   getDocs,
//   increment,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
// import React, { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { db } from "../firebase";

// const ChatBox = ({ itinerary, setItinerary }) => {
//   const [response, setResponse] = useState("");
//   const [prompt, setPrompt] = useState("");
//   const [conversationHistory, setConversationHistory] = useState([]);
//   const [userProfile, setUserProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSatisfied, setIsSatisfied] = useState(false);
//   const { user } = useUser();
//   const [itineraryName, setItineraryName] = useState("");
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const handleOpenDialog = () => setDialogOpen(true);
//   const handleCloseDialog = () => setDialogOpen(false);

//   useEffect(() => {
//     if (user) {
//       getQuizResults();
//     }
//   }, [user]);

//   const getQuizResults = async () => {
//     if (!user) return;
//     try {
//       const quizCollectionRef = collection(db, `users/${user.id}/Quiz Results`);
//       const quizSnapshot = await getDocs(quizCollectionRef);
//       if (!quizSnapshot.empty) {
//         const fetchedQuizResults = [];
//         quizSnapshot.forEach((doc) => fetchedQuizResults.push(doc.data()));
//         setUserProfile(fetchedQuizResults);
//       }
//     } catch (error) {
//       console.error("Error fetching quiz results:", error);
//     }
//   };

//   const saveItinerary = async () => {
//     if (!itineraryName.trim()) {
//       alert("Please enter a name for your itinerary.");
//       return;
//     }

//     try {
//       const userDocRef = doc(collection(db, "users"), user.id);
//       const colRef = collection(userDocRef, "Saved Itineraries");

//       await setDoc(doc(colRef, itineraryName), { itinerary: itinerary });

//       alert("Itinerary saved successfully");
//       handleCloseDialog();
//       setItineraryName("");
//     } catch (error) {
//       console.error("Error saving itinerary:", error);
//       alert("An error occurred while saving your itinerary. Please try again.");
//     }
//   };

//   const incrementUserPlansGenerated = async () => {
//     if (user) {
//       const userDocRef = doc(collection(db, "users"), user.id);
//       await updateDoc(userDocRef, { plansGenerated: increment(1) });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!prompt.trim()) {
//       alert("Please enter a prompt to generate recommendations");
//       return;
//     }
//     setIsLoading(true);
//     const updatedConversationHistory = [
//       ...conversationHistory,
//       { role: "user", content: prompt },
//     ];
//     setConversationHistory(updatedConversationHistory);

//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           prompt,
//           conversationHistory: updatedConversationHistory,
//           userProfile,
//         }),
//       });

//       const data = await response.json();
//       console.log("data", data);
//       const parsedData = JSON.parse(data.response);
//       setItinerary(parsedData.itinerary);
//       setResponse(parsedData.intro);

//       setConversationHistory((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Here's your itinerary! Are you satisfied?",
//         },
//       ]);

//       setIsSatisfied(true);
//       incrementUserPlansGenerated();
//     } catch (error) {
//       console.error("Error generating recommendations:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatItinerary = () => {
//     if (!itinerary || !Array.isArray(itinerary)) {
//       return <Typography variant="body2">No itinerary available.</Typography>;
//     }

//     return itinerary.map((item, index) => (
//       <Card key={index} sx={{ mb: 2 }}>
//         <CardContent>
//           <Typography variant="h6">{`${item.time} - ${item.name}`}</Typography>
//           <Typography variant="body1">{item.description}</Typography>
//           <Typography
//             variant="body2"
//             color="textSecondary"
//           >{`Address: ${item.address}`}</Typography>
//         </CardContent>
//       </Card>
//     ));
//   };

//   const handleConfirmation = (isSatisfied) => {
//     if (isSatisfied) {
//       setConversationHistory((prev) => [
//         ...prev,
//         { role: "assistant", content: "Great! Enjoy your day!" },
//       ]);
//       setIsSatisfied(false);
//     } else {
//       setConversationHistory((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Let's adjust the itinerary. What would you like to change?",
//         },
//       ]);
//       setIsSatisfied(false);
//     }
//   };

//   return (
//     <Container maxWidth="false">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           padding: 4,
//         }}
//       >
//         {/* Chat box section */}
//         <Box
//           sx={{ width: "50%", borderRight: "1px solid #ddd", paddingRight: 2 }}
//         >
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Chat with Poppy
//           </Typography>

//           <Box sx={{ height: "100%", overflowY: "scroll", mb: 2 }}>
//             {conversationHistory.map((message, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   justifyContent:
//                     message.role === "user" ? "flex-end" : "flex-start",
//                 }}
//               >
//                 <Card
//                   sx={{
//                     backgroundColor:
//                       message.role === "user" ? "#1976D2" : "#E0E0E0",
//                     color: message.role === "user" ? "#fff" : "#000",
//                     mb: 1,
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="body2">{message.content}</Typography>
//                   </CardContent>
//                 </Card>
//               </Box>
//             ))}
//             {isLoading && <CircularProgress size={24} />}
//           </Box>

//           <TextField
//             variant="outlined"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             fullWidth
//             placeholder="Type your message..."
//             onKeyPress={(e) => {
//               if (e.key === "Enter") handleSubmit();
//             }}
//             sx={{ mb: 2 }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             fullWidth
//             disabled={isLoading}
//           >
//             {isLoading ? "Generating..." : "Send"}
//           </Button>

//           {/* Move confirmation buttons here */}
//           {isSatisfied && (
//             <Box mt={2}>
//               <Typography variant="body1">
//                 Are you satisfied with this itinerary?
//               </Typography>
//               <Button onClick={() => handleConfirmation(true)} sx={{ mr: 2 }}>
//                 Yes
//               </Button>
//               <Button onClick={() => handleConfirmation(false)}>No</Button>
//             </Box>
//           )}
//         </Box>

//         {/* Itinerary section */}
//         <Box sx={{ width: "50%", paddingLeft: 2 }}>
//           <Typography variant="h6">Itinerary</Typography>
//           {itinerary ? (
//             formatItinerary()
//           ) : (
//             <Typography variant="body2" sx={{ color: "gray" }}>
//               Itinerary will be displayed here once generated.
//             </Typography>
//           )}
//           {itinerary && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleOpenDialog}
//             >
//               Save Itinerary
//             </Button>
//           )}
//         </Box>
//       </Box>
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Save Itinerary</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please enter a name for your itinerary.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Itinerary Name"
//             type="text"
//             fullWidth
//             value={itineraryName}
//             onChange={(e) => setItineraryName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={saveItinerary} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default ChatBox;

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
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

const ChatBox = ({ itinerary, setItinerary }) => {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSatisfied, setIsSatisfied] = useState(false);
  const { user } = useUser();
  const [itineraryName, setItineraryName] = useState("");
  const [accordionExpanded, setAccordionExpanded] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

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
    if (!itineraryName.trim()) {
      alert("Please enter a name for your itinerary.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const colRef = collection(userDocRef, "Saved Itineraries");

      await setDoc(doc(colRef, itineraryName), { itinerary: itinerary });

      alert("Itinerary saved successfully");
      handleCloseDialog();
      setItineraryName("");
    } catch (error) {
      console.error("Error saving itinerary:", error);
      alert("An error occurred while saving your itinerary. Please try again.");
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
      console.log("data", data);
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
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
            width: "50%",
            borderRight: "1px solid #ddd",
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
                      onClick={handleOpenDialog}
                    >
                      Save Itinerary
                    </Button>

                    {/* Save Itinerary Dialog */}
                    <Dialog
                      open={dialogOpen}
                      sx={{
                        ".MuiDialog-paper": {
                          bgcolor: "#212529",
                          color: "#B4B4B4",
                        },
                      }}
                      onClose={handleCloseDialog}
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
                          onClick={handleCloseDialog}
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
              sx={{ mb: 2 }}
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
