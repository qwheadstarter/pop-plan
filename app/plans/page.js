'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { useRouter } from "next/navigation"
import {
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@mui/material'
import Navigation from "@/app/components/Navigation";

export default function Plans() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [itineraries, setItineraries] = useState([])
    const router = useRouter()
  
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
        getItineraries()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const formatItinerary = (itinerary) => {
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

    return (
        <Container maxWidth="false">
          <Navigation />
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {itineraries.map((itinerary, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {itinerary.id} {formatItinerary(itinerary.itinerary)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
