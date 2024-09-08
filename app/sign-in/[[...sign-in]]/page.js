"use client";

import { SignIn } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function SignInPage() {
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
        <Navigation />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: "200px" }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#fff", mt: 10, mb: 3, fontWeight: "700" }}
          >
            Sign In
          </Typography>
          <SignIn routing="hash" />
        </Box>
        <Footer />
      </div>
    </>
  );
}
