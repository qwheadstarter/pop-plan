import {
  Card,
  CardMedia,
  Typography,
  Box,
  CardContent,
  Container,
  Grid,
} from "@mui/material";
import React from "react";

const FeaturedDestinations = () => {
  return (
    <div className="featured-destinations-container">
      <Container>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: "#2f2f2f", // Darker grey color
            fontWeight: 500,
            mt: 1,
            mb: 3,
          }}
        >
          Instant Itineraries Wherever You Are
        </Typography>
        <Grid container spacing={15}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "400px",
                height: "400px",
                position: "relative",
                border: "1px solid black",
                boxShadow: "rgba(255,255,255,0.25)",
                borderRadius: "12px",
              }}
            >
              <CardMedia>
                <img
                  src="/assets/Boston.png"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: "0", // Remove padding from content
                  backgroundColor: "rgba(0,0,0,0)",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.5)", // 50% black background
                    padding: "1px 0", // 1px top and bottom
                    width: "100%", // Full width container
                    textAlign: "left", // left align the text
                    paddingLeft: "6px", // space before text
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Boston,<br></br>Massachusetts
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "400px",
                height: "400px",
                position: "relative",
                border: "1px solid black",
                boxShadow: "rgba(255,255,255,0.25)",
                borderRadius: "12px",
              }}
            >
              <CardMedia sx={{ width: "100%", height: "100%" }}>
                <img
                  src="/assets/Okinawa.png"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: "0", // Remove padding
                  backgroundColor: "rgba(0,0,0,0)",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.5)", // 50% black background
                    padding: "1px 0", // 1px top and bottom
                    width: "100%", // Full width container
                    textAlign: "left", // left align the text
                    paddingLeft: "6px", // space before text
                  }}
                >
                  <Typography variant="h6" sx={{ color: "white" }}>
                    Okinawa,<br></br> Japan
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "400px",
                height: "400px",
                position: "relative",
                border: "1px solid black",
                boxShadow: "rgba(255,255,255,0.25)",
                borderRadius: "12px",
              }}
            >
              <CardMedia sx={{ width: "100%", height: "100%" }}>
                <img
                  src="/assets/Salesforce Park.png"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: "0", // Remove padding
                  backgroundColor: "rgba(0,0,0,0)",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.5)", // 50% black background
                    padding: "1px 0", // 1px top and bottom
                    width: "100%", // Full width container
                    textAlign: "left", // left align the text
                    paddingLeft: "6px", // space before text
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    San Francisco <br></br>California
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "400px",
                height: "400px",
                position: "relative",
                border: "1px solid black",
                boxShadow: "rgba(255,255,255,0.25)",
                borderRadius: "12px",
              }}
            >
              <CardMedia sx={{ width: "100%", height: "100%" }}>
                <img
                  src="/assets/la jolla.png"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: "0", // Remove padding
                  backgroundColor: "rgba(0,0,0,0)",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.5)", // 50% black background
                    padding: "1px 0", // 1px top and bottom
                    width: "100%", // Full width container
                    textAlign: "left", // left align the text
                    paddingLeft: "6px", // space before text
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    La Jolla, <br></br>California
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "400px",
                height: "400px",
                position: "relative",
                border: "1px solid black",
                boxShadow: "rgba(255,255,255,0.25)",
                borderRadius: "12px",
              }}
            >
              <CardMedia sx={{ width: "100%", height: "100%" }}>
                <img
                  src="/assets/Alamo Square.png"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: "0", // Remove padding
                  backgroundColor: "rgba(0,0,0,0)",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.5)", // 50% black background
                    padding: "1px 0", // 1px top and bottom
                    width: "100%", // Full width container
                    textAlign: "left", // left align the text
                    paddingLeft: "6px", // space before text
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    San Francisco,<br></br>California
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "400px",
                height: "400px",
                position: "relative",
                border: "1px solid black",
                boxShadow: "rgba(255,255,255,0.25)",
                borderRadius: "12px",
              }}
            >
              <CardMedia sx={{ width: "100%", height: "100%" }}>
                <img
                  src="/assets/Walla Walla.png"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </CardMedia>
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: "0", // Remove padding
                  backgroundColor: "rgba(0,0,0,0)",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.5)", // 50% black background
                    padding: "1px 0", // 1px top and bottom
                    width: "100%", // Full width container
                    textAlign: "left", // left align the text
                    paddingLeft: "6px", // space before text
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Walla Walla, <br></br>Washington
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FeaturedDestinations;
