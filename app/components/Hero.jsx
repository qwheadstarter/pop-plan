"use client";

import React, { useRef } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import { ArrowCircleDownOutlined } from "@mui/icons-material";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import HowItWorks from "./HowItWorks";

const Hero = () => {
  const howItWorksRef = useRef(null);

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const videos = [
    "/assets/1.mp4",
    "/assets/2.mp4",
    "/assets/3.mp4",
    "/assets/4.mp4",
    "/assets/5.mp4",
    "/assets/6.mp4",
    "/assets/7.mp4",
    "/assets/8.mp4",
    "/assets/9.mp4",
    "/assets/10.mp4",
    "/assets/11.mp4",
    "/assets/12.mp4",
    "/assets/13.mp4",
    "/assets/14.mp4",
  ];

  const getRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  };

  const videoUrl = getRandomVideo();

  return (
    <>
      <div className="hero">
        <video className="background-video" autoPlay loop muted>
          <source src={videoUrl} type="video/mp4" />
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
          <Typography variant="h2" sx={{ color: "#fff", fontWeight: "700" }}>
            Tailored Experiences, Just for You
          </Typography>
          <TypeAnimation
            sequence={[
              "From hidden gems to must-sees, craft a day in sync with what you love",
              2000,
              "Discover the City, One Experience at a Time",
              2000,
              "Let Poppy Map Out Your Ideal Day",
              2000,
              "Find Unique Spots Catered to Your Tastes",
              2000,
              "Personalize Your Adventure, Every Step of the Way",
              2000,
              "Explore, Enjoy, and Embrace What You Love",
              2000,
              "Your Interests, Your Itinerary, Your Day",
            ]}
            speed={50}
            style={{ fontSize: "2em", fontWeight: "600" }}
            repeat={Infinity}
          />

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
                        color: "grey",
                      },
                    }}
                  />
                }
              >
                Chat with Poppy
              </Button>
            </Link>
          </Box>
          <Box sx={{ marginTop: "300px" }}>
            <ArrowCircleDownOutlined
              sx={{
                height: "40px",
                width: "40px",
                mt: "40px",
                cursor: "pointer",
                "&:hover": {
                  color: "grey",
                },
              }}
              onClick={scrollToHowItWorks}
            />
          </Box>
        </Container>
      </div>
      <HowItWorks ref={howItWorksRef} />
    </>
  );
};

export default Hero;
