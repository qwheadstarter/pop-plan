"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container
} from "@mui/material";
import { Grid, Typography } from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer"

import { useSearchParams } from "next/navigation";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docSnap = await getDocs(colRef);
      const flashcards = [];

      docSnap.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <>
      <Container maxWidth="false" sx={{ bgcolor: "#020303", height: "100%" }}>
        <Header/ >
        <Box
          sx={{
            display: "flex",
            mt: 10,
            ml: 2,
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            href="/flashcards"
            sx={{
              p: "10px 25px 10px 25px",
              fontSize: "18px",
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
            Back
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: "#020303",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    handleCardClick(index);
                  }}
                >
                  <CardContent>
                    <Box
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
                          <Typography varian="h5" component="div">
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div>
                          <Typography varian="h5" component="div">
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Footer/ >
      </Container>
    </>
  );
}
