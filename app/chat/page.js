"use client";

import { Box, AppBar, Typography, Toolbar } from "@mui/material";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import MapComponent from "../components/MapComponent";
import Places from "../components/Places";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";

const Chat = () => {
  const [itinerary, setItinerary] = useState(null);
  const { user } = useUser;

  return (
    <>
      <div className="chat-page">
        <>
          <AppBar
            position="relative"
            sx={{
              bgcolor: "rgba(0,0,0,0.20)",
              boxShadow: "none",
              zIndex: 1200,
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/assets/icon.png"
                  alt="Pop Plan Logo"
                  style={{ height: "50px", width: "50px" }}
                />
                <Typography
                  sx={{
                    fontSize: "45px",
                    color: "#fff",
                    ml: 2,
                  }}
                >
                  Pop-Plan
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 4,
                  flexGrow: 1,
                }}
              >
                <Link
                  href="/"
                  passHref
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Link>

                <Link
                  href="/chat"
                  passHref
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Chat
                </Link>

                <Link
                  href="/contact"
                  passHref
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Contact
                </Link>

                {!user ? (
                  <>
                    <Link
                      href="/sign-in"
                      passHref
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                      }}
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/sign-up"
                      passHref
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                      }}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/plans"
                      passHref
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        "&:hover": { color: "#46515A" },
                      }}
                    >
                      Plans
                    </Link>

                    <Link
                      href="/profile"
                      passHref
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        "&:hover": { color: "#46515A" },
                      }}
                    >
                      Profile
                    </Link>
                    <Box>
                      {" "}
                      <UserButton />
                    </Box>
                  </>
                )}
              </Box>
            </Toolbar>
          </AppBar>
        </>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              // marginTop: "64px",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                width: "40%",
                borderRight: "1px solid #ddd",
                height: "100%",
              }}
            >
              <ChatBox setItinerary={setItinerary} itinerary={itinerary} />
            </Box>
            <Box sx={{ flexGrow: 1, width: "35%" }}>
              <MapComponent itinerary={itinerary} />
            </Box>
            <Box
              sx={{
                width: 340,
                padding: 0,
              }}
            >
              <Places itinerary={itinerary} />
            </Box>
          </Box>
          <Footer />
        </Box>
      </div>
    </>
  );
};

export default Chat;
