"use client";

import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { ArrowCircleDownOutlined } from "@mui/icons-material";
import Link from "next/link";

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
          <Link href="/chat" passHref style={{ textDecoration: "none" }}>
            <Button
              sx={{
                display: "flex",
                color: "grey",
                justifyContent: "space-between",
                alignItems: "center",
                border: "none",
                borderRadius: "20px",
                width: "300px",
                height: "40px",
                bgcolor: "#fff",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#fff",
                },
              }}
              endIcon={
                <ArrowCircleRightRoundedIcon
                  sx={{
                    width: "40px",
                    height: "50px",
                    color: "grey",
                    "&:hover": {
                      color: "#D4523B",
                    },
                  }}
                />
              }
            >
              Chat with Poppy
            </Button>
          </Link>
        </Box>
        <Box>
          <ArrowCircleDownOutlined
            sx={{
              height: "40px",
              width: "40px",
              mt: "340px",
              cursor: "pointer",
              "&:hover": {
                color: "grey",
              },
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Hero;
