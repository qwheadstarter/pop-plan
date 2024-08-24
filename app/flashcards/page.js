"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,  
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography
} from "@mui/material";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer"

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const collections = data.flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container maxWidth="false" sx={{ bgcolor: "#020303", height: "100vh" }}>
      <Header/ >
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {flashcards.length > 0 ? (
          flashcards.map((set, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor: "#0A0A0A",
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                  borderStyle: "solid",
                  borderColor: "#fff",               
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardActionArea onClick={() => handleCardClick(set.name)}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {set.name.toUpperCase()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              textAlign: "center",
              ml: 20,
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#fff" }}>
              You have no Flashcards yet, start generating some now!
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: "#111111",
                borderColor: "#000",
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#000",
                  background: "#414141",
                },
              }}
              onClick={() => router.push("/generate")}
            >
              Generate
            </Button>
          </Box>
        )}
      </Grid>
      <Footer/ >
    </Container>
  );
}
