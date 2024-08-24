"use client";

import React, { useState } from "react";
import { db } from "@/firebase";
import { getDoc, doc, collection, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Alert
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { useUser } from "@clerk/nextjs";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer"

export default function Generate() {
  const { user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter;

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const handleSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
      };

      recognition.onerror = (event) => {
        setError("Speech recognition error: " + event.error);
        setIsListening(false);
      };

      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } else {
      setError("Your browser does not support speech recognition.");
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with the same name already exists.");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  if (!user) {
    return (
      <Container
        maxWidth={false}
        sx={{
          bgcolor: "#020303",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <img
            src={"../assets/icon.png"}
            style={{
              width: "160px",
              height: "160px",
              marginTop: "3.5%",
              marginRight: "20px",
            }}
          />
          <Typography variant="h1" sx={{ color: "#fff", fontSize: "12rem" }}>
            Pop-Plan
          </Typography>
        </Box>

        <Typography variant="h2" sx={{ color: "#fff" }}>
          You need to sign in to view this page
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: "2rem",
          }}
        >
          <Button
            color="inherit"
            sx={{
              variant: "contained",
              p: "10px 40px 10px 40px",
              mr: 3,
              fontSize: "24px",
              fontWeight: "400",
              color: "#fff",
              bgcolor: "transparent",
              border: "1px solid white",
              boxshadow: "0 0.5rem -0.4em rgba(255,255,255,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                bgcolor: "rgba(245, 245, 245, 0.1)",
                borderColor: "white",
                boxshadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0.7)",
                transform: "translateY(-0.25em)",
              },
            }}
            href="/sign-in"
          >
            Login
          </Button>
          <Button
            color="inherit"
            sx={{
              variant: "contained",
              p: "10px 40px 10px 40px",
              fontSize: "24px",
              fontWeight: "400",
              color: "#fff",
              bgcolor: "transparent",
              border: "1px solid white",
              boxshadow: "0 0.5rem -0.4em rgba(255,255,255,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                bgcolor: "rgba(245, 245, 245, 0.1)",
                borderColor: "white",
                boxshadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0.7)",
                transform: "translateY(-0.25em)",
              },
            }}
            href="/sign-up"
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="false"
      sx={{ bgcolor: "#020303", maxWidth: "100%", height: "100%" }}
    >
      <Header/ >
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#fff",
            mb: 3,
          }}
        >
          Generate Flashcards
        </Typography>

        <Paper
          sx={{ pt: 4, width: "100%", p: 2, bgcolor: "#030302", color: "#fff" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <IconButton
              color={isListening ? "secondary" : "primary"}
              sx={{ width: "50px", height: "50px" }}
              onClick={handleSpeechRecognition}
            >
              {isListening ? (
                <MicOffIcon
                  sx={{
                    fontSize: "50px",
                    m: 0,
                    p: 0,
                  }}
                />
              ) : (
                <MicIcon sx={{ fontSize: "50px" }} />
              )}
            </IconButton>
            <Alert
              severity="info"
              variant="filled"
              sx={{ ml: "1%", maxWidth: "90%", mb: 2 }}
            >
              Want to generate flashcards faster? Click the mic button to speak
              your text instead of typing!
            </Alert>
          </Box>

          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            InputLabelProps={{
              style: {
                color: "#fff",
              },
            }}
            variant="outlined"
            inputProps={{
              style: {
                color: "#fff",
              },
            }}
            fullWidth
            multiline
            rows={4}
            sx={{ 
              mb: 2,
              border: "2px solid white",
              bgcolor: "#0A0A0A",
              color: "#fff" 
            }}
          />
          <Button
            variant="contained"
            color="inherit"
            onClick={handleSubmit}
            fullWidth
            sx={{
              bgcolor: "transparent",
              color: "#fff",
              border: "1px solid white",
              "&:hover": {
                bgcolor: "transparent",
                color: "rgba(245, 245, 245, 0.7)",
                "&:active": { color: "rgba(245, 245, 245, 0.7)" },
              },
            }}
          >
            Submit
          </Button>
        </Paper>
      </Box>
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "center", color: "#fff" }}
            gutterBottom
          >
            Flashcards Preview
          </Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent
                      sx={{
                        color: "#fff",
                        bgcolor: "#020303",
                        perspective: "1000px",
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        borderRadius: 1,
                        borderStyle: "solid",
                        borderColor: "#fff",                        
                        overflow: "hidden",
                        "& > div": {
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          transform: flipped[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        },
                        "& > div > div": {
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 2,
                          boxSizing: "border-box",
                          borderRadius: "10px",
                          backgroundColor: "#0A0A0A",
                        },
                        "& > div > div:nth-of-type(2)": {
                          transform: "rotateY(180deg)",
                        },
                      }}
                    >
                      <div>
                        <div>
                          <Typography variant="h6" align="center">
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="h6" align="center">
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                bgcolor: "transparent",
                color: "#fff",
                border: "1px solid white",
                mb: 5,
                "&:hover": {
                  bgcolor: "transparent",
                  color: "rgba(245, 245, 245, 0.7)",
                  "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                },
              }}
              onClick={handleOpen}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            bgcolor: "#020303",
            color: "#fff",
          }}
        >
          Save Flashcards
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "#020303",
            color: "#fff",
          }}
        >
          <DialogContentText
            sx={{
              color: "#fff",
            }}
          >
            Enter a name for the flashcard set
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            sx={{
              bgcolor: "#0A0A0A",
              border: "1px solid white",
            }}
            InputProps={{
              style: {
                color: "#fff",
              },
            }}
            InputLabelProps={{
              style: {
                color: "#fff",
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: "#020303",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={saveFlashcards}
            sx={{
              bgcolor: "transparent",
              color: "#fff",
              border: "1px solid white",
              mb: 5,

              "&:hover": {
                bgcolor: "transparent",
                color: "rgba(245, 245, 245, 0.7)",
                "&:active": { color: "rgba(245, 245, 245, 0.7)" },
              },
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "transparent",
              color: "#fff",
              border: "1px solid white",
              mb: 5,
              "&:hover": {
                bgcolor: "transparent",
                color: "rgba(245, 245, 245, 0.7)",
                "&:active": { color: "rgba(245, 245, 245, 0.7)" },
              },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Footer/ >
    </Container>
  );
}
