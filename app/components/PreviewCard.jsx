import { Star } from "@mui/icons-material";
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

const PreviewCard = () => {
  return (
    <Container
      sx={{
        height: "100%",
        bgcolor: "#fff",
      }}
    >
      <Typography
        variant="h3"
        sx={{ textAlign: "center", color: "#46515A", fontWeight: 500 }}
        gutterBottom
      >
        Featured Destinations
      </Typography>
      <Grid container spacing={4} sx={{}}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "300px",
              height: "400px",
              position: "relative",
              border: "1px solid black",
              boxShadow: "rgba(255,255,255,0.25",
              borderRadius: "12px",
            }}
          >
            <CardMedia sx={{ width: "100%", height: "100%" }}>
              <img
                src="/assets/smp.jpeg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardMedia>
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Santa Monica Pier, <br></br>Los Angeles, CA
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Star sx={{ color: "gold", mr: 1 }} />
                <Typography sx={{ color: "#fff" }}> 4.3 (697)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "300px",
              height: "400px",
              position: "relative",
              border: "1px solid black",
              boxShadow: "rgba(255,255,255,0.25",
              borderRadius: "12px",
            }}
          >
            <CardMedia sx={{ width: "100%", height: "100%" }}>
              <img
                src="/assets/kyoto.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardMedia>
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Kyoto, <br></br>Japan
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Star sx={{ color: "gold", mr: 1 }} />
                <Typography sx={{ color: "#fff" }}> 4.6 (1193)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "300px",
              height: "400px",
              position: "relative",
              border: "1px solid black",
              boxShadow: "rgba(255,255,255,0.25",
              borderRadius: "12px",
            }}
          >
            <CardMedia sx={{ width: "100%", height: "100%" }}>
              <img
                src="/assets/lv.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardMedia>
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Las Vegas <br></br>Neveda
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Star sx={{ color: "gold", mr: 1 }} />
                <Typography sx={{ color: "#fff" }}> 4.2 (6930)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "300px",
              height: "400px",
              position: "relative",
              border: "1px solid black",
              boxShadow: "rgba(255,255,255,0.25",
              borderRadius: "12px",
            }}
          >
            <CardMedia sx={{ width: "100%", height: "100%" }}>
              <img
                src="/assets/kauai.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardMedia>
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Kauai, <br></br>Hawaii
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Star sx={{ color: "gold", mr: 1 }} />
                <Typography sx={{ color: "#fff" }}> 4.4 (2893)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "300px",
              height: "400px",
              position: "relative",
              border: "1px solid black",
              boxShadow: "rgba(255,255,255,0.25",
              borderRadius: "12px",
            }}
          >
            <CardMedia sx={{ width: "100%", height: "100%" }}>
              <img
                src="/assets/paris.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardMedia>
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Paris,<br></br>France
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Star sx={{ color: "gold", mr: 1 }} />
                <Typography sx={{ color: "#fff" }}> 4.7 (5633)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              width: "300px",
              height: "400px",
              position: "relative",
              border: "1px solid black",
              boxShadow: "rgba(255,255,255,0.25",
              borderRadius: "12px",
            }}
          >
            <CardMedia sx={{ width: "100%", height: "100%" }}>
              <img
                src="/assets/ny.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardMedia>
            <CardContent
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "16px",
                backgroundColor: "rgba(0,0,0,0)",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Manhatten, <br></br>New York
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Star sx={{ color: "gold", mr: 1 }} />
                <Typography sx={{ color: "#fff" }}> 4.4 (4392)</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PreviewCard;
