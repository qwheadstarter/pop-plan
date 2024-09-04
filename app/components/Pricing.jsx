import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

const Pricing = () => {
  return (
    <div className="pricing-container">
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", color: "#46515A", fontWeight: 500 }}
        >
          Choose Your Adventure with Poppy
        </Typography>
        <Box sx={{ mt: "2rem" }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  border: "none",
                  borderRadius: "8px",
                  maxWidth: "500px",
                  height: "400px",
                  bgcolor: "#ffffff",
                  color: "#46515a",
                  boxShadow:
                    "rgba(99, 93, 93, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                    padding: "20px",
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Basic Plan
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Access 5 personalized day plans—completely free!
                    </Typography>
                    <Typography variant="h6">
                      Discover hidden gems and popular spots tailored to your
                      interests.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Perfect for casual explorers. Get started today!
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                    }}
                  >
                    Get Started for Free
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  border: "none",
                  borderRadius: "8px",
                  maxWidth: "500px",
                  height: "400px",
                  bgcolor: "#ffffff",
                  color: "#46515a",
                  boxShadow:
                    "rgba(99, 93, 93, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%", // Make sure content stretches to fill the card height
                    padding: "20px", // Add padding for consistency
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Explorer Plan
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      flexGrow: 1, // Helps stretch the box for alignment
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Unlock 10 personalized day plans for just $10.
                    </Typography>
                    <Typography variant="h6">
                      Dive deeper into exclusive experiences and local
                      favorites.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Ideal for adventurers looking for more curated options!
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                    }}
                  >
                    Upgrade to Explorer
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Pricing;
