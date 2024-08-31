import React from "react";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

const Hero = () => {
  return (
    <div className="hero">
      <video className="background-video" autoPlay loop muted>
        <source src="../assets/hero.mp4" type="video/mp4" />
      </video>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: "20%",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "700" }}>
          Tailored Experiences, Just for You
        </Typography>
        <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
          From hidden gems to must-sees, craft a day in sync with what you love
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "none",
              borderRadius: "20px",
              width: "300px",
              height: "40px",
              bgcolor: "#fff",
            }}
          >
            <Typography ml={1} sx={{ color: "grey" }}>
              Chat with Poppy
            </Typography>
            <IconButton>
              <ArrowCircleRightRoundedIcon
                sx={{
                  width: "40px",
                  height: "50px",
                  color: "grey",
                  "&: hover": {
                    color: "#D4523B",
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Hero;
