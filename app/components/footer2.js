import React from "react";

import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import "@/app/globals.css";
import { GitHub, LinkedIn } from "@mui/icons-material";
import Link from "next/link";

export default function Footertwo() {
  return (
    <Box
      sx={{
        bgcolor: "transparent",
        color: "white",
        py: 4,
        mt: "auto",
      }}
    >
      <Divider
        orientation="horizontal"
        component="div"
        sx={{ background: "#fff", mb: 5 }}
      />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <img
                src="/assets/icon.png"
                alt="App Icon"
                style={{
                  maxWidth: "30px",
                  maxHeight: "30px",
                  marginRight: "10px",
                }}
              />
              <Typography variant="h5" gutterBottom>
                Pop-Plan
              </Typography>
            </Box>

            <Typography variant="body2">
              Simplify your study sessions with our powerful flashcard tool.
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Quick Links
            </Typography>
            <Link
              href="/"
              style={{
                display: "block",
                my: 1,
                color: "#fff",
                textDecoration: "none",
                "&:hover": {
                  color: "rgba(245, 245, 245, 0.7)",
                  "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                },
              }}
            >
              Home
            </Link>
            <Link
              href="/features"
              style={{
                display: "block",
                my: 1,
                color: "#fff",
                textDecoration: "none",
                "&:hover": {
                  color: "rgba(245, 245, 245, 0.7)",
                  "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                },
              }}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              style={{
                display: "block",
                my: 1,
                color: "#fff",
                textDecoration: "none",
                "&:hover": {
                  color: "rgba(245, 245, 245, 0.7)",
                  "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                },
              }}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              style={{
                display: "block",
                my: 1,
                color: "#fff",
                textDecoration: "none",
                "&:hover": {
                  color: "rgba(245, 245, 245, 0.7)",
                  "&:active": { color: "rgba(245, 245, 245, 0.7)" },
                },
              }}
            >
              Contact Us
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h5" gutterBottom>
              Follow Us
            </Typography>
            <Link
              href="#"
              color="inherit"
              underline="none"
              sx={{ display: "block", my: 1 }}
            >
              <GitHub
                sx={{
                  height: "50px",
                  width: "50px",
                  color: "#fff",
                  mr: 1,
                  "&:hover": {
                    boxshadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0.7)",
                    transform: "translateY(-0.25em)",
                  },
                }}
              />
            </Link>

            <Link
              href="#"
              color="inherit"
              underline="none"
              sx={{ display: "block", my: 1 }}
            >
              <LinkedIn
                sx={{
                  height: "50px",
                  width: "50px",
                  color: "#fff",
                  "&:hover": {
                    boxshadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0.7)",
                    transform: "translateY(-0.25em)",
                  },
                }}
              />
            </Link>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Pop-Plan. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
