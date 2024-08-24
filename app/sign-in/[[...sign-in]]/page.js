"use client";

import { SignIn } from "@clerk/nextjs";
import {
  Box,
  Container,
  Typography
} from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer"

export default function SignInPage() {
  return (
    <Container
      maxWidth="false"
      sx={{
        bgcolor: "#020303",
        height: "100%",
      }}
    >
      <Header/ >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: "200px" }}
      >
        <Typography variant="h4" sx={{ color: "#fff", mt: 3, mb: 3 }}>
          Sign In
        </Typography>
        <SignIn routing="hash" />
      </Box>
      <Footer/ >
    </Container>
  );
}
