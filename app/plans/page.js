"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  Collapse,
  IconButton,
  Skeleton,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navigation from "@/app/components/Navigation";

export default function Plans() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [itineraries, setItineraries] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track which cards are expanded
  const router = useRouter();

  useEffect(() => {
    async function getItineraries() {
      if (user) {
        const userRef = doc(collection(db, "users"), user.id);
        const docSnap = await getDocs(collection(userRef, "Saved Itineraries"));

        const savedItineraries = [];
        docSnap.forEach((doc) => {
          savedItineraries.push({ id: doc.id, ...doc.data() });
        });
        setItineraries(savedItineraries);
      }
    }
    getItineraries();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Skeleton variant="rectangular" height={250} />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Toggle expand state for each card
  const handleExpandClick = (itineraryId) => {
    setExpanded((prevState) => ({
      ...prevState,
      [itineraryId]: !prevState[itineraryId], // Toggle for each specific itinerary
    }));
  };

  const formatItinerary = (itinerary, itineraryId) => {
    if (!itinerary || !Array.isArray(itinerary)) {
      return <Typography variant="body2">No itinerary available.</Typography>;
    }

    return itinerary.map((item, index) => (
      <div key={index}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mt: 2 }}
        >{`${item.time} - ${item.name}`}</Typography>
        <Collapse in={expanded[itineraryId]} timeout="auto" unmountOnExit>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {item.description}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: "block", mt: 1 }}
          >{`Address: ${item.address}`}</Typography>
        </Collapse>
      </div>
    ));
  };

  return (
    <div className="plans">
      {" "}
      {/* Wrap in plans class */}
      <Container maxWidth="lg">
        <Navigation />
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          Saved Itineraries
        </Typography>
        <Grid container spacing={4}>
          {itineraries.map((itinerary, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                    backgroundColor: "#f9f9f9",
                  },
                  cursor: "pointer",
                }}
              >
                <CardActionArea onClick={() => handleExpandClick(itinerary.id)}>
                  <CardContent sx={{ position: "relative" }}>
                    <Typography
                      variant="h5"
                      component="div"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {itinerary.id}
                    </Typography>

                    {/* Show expand/collapse icon */}
                    <IconButton
                      onClick={() => handleExpandClick(itinerary.id)}
                      sx={{ position: "absolute", top: 8, right: 8 }}
                      aria-label="expand"
                    >
                      {expanded[itinerary.id] ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>

                    {/* Show the time and name of each item */}
                    {formatItinerary(itinerary.itinerary, itinerary.id)}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
