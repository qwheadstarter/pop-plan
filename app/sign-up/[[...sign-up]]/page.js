"use client";

import { SignUp } from "@clerk/nextjs";
import {
  Box,
  Container,
  Typography
} from "@mui/material";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer2"

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
          Not a member yet? Sign up to use Pop-Plan!
        </Typography>
        <SignUp routing="hash" forceRedirectUrl="/quiz"/>
      </Box>
      <Footer/ >
    </Container>
  );
}
