import React from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import { UserButton, useUser } from "@clerk/nextjs";
import "../app/globals.css";

export default function Header() {
    const { user } = useUser();

    return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Toolbar>
          <img
            src="../assets/icon.png"
            style={{ maxWidth: "30px", maxHeight: "30px", marginRight: "10px" }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pop-Plan
          </Typography>
          <Button
            href="/"
            color="inherit"
            sx={{
              "&:hover": {
                color: "rgba(245, 245, 245, 0.7)",
              },
            }}
          >
            Home
          </Button>
          {!user ? (
            <>
              <Button
                href="#features"
                color="inherit"
                sx={{
                "&:hover": {
                    color: "rgba(245, 245, 245, 0.7)",
                },
                }}
              >
                Features
              </Button>
              <Button
                href="#pricing"
                color="inherit"
                sx={{
                "&:hover": {
                    color: "rgba(245, 245, 245, 0.7)",
                },
                }}
              >
                Pricing
              </Button>
              <Button
                color="inherit"
                sx={{ "&:hover": { color: "rgba(245, 245, 245, 0.7)" } }}
                href="/sign-in"
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ "&:hover": { color: "rgba(245, 245, 245, 0.7)" } }}
                href="/sign-up"
              >
                Sign Up
              </Button>
              <Button
                color="inherit"
                sx={{ "&:hover": { color: "rgba(245, 245, 245, 0.7)" } }}
                href="/quiz"
              >
                Quiz
              </Button>
              </>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{ "&:hover": { color: "rgba(245, 245, 245, 0.7)" } }}
                href="/generate"
              >
                Generate
              </Button>                            
              <Button
                color="inherit"
                sx={{ "&:hover": { color: "rgba(245, 245, 245, 0.7)" } }}
                href="/flashcards"
              >
                My Flashcards
              </Button>                
              <UserButton />
            </>
          )}
        </Toolbar>
      </AppBar>
    )
}