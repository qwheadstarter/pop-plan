"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser, UserButton } from "@clerk/nextjs";

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useUser();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <div
      style={{
        display: "flex",
        color: "#000",
        flexDirection: "column",
        width: "200px",
        height: "100%",
        paddingTop: "64px",
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mt: "20px",
        }}
      >
        <img
          src="/assets/icon.png"
          alt="Pop Plan Logo"
          style={{ height: "50px", width: "50px" }}
        />
        <Typography variant="h4" sx={{ color: "#fff", ml: "1rem" }}>
          Pop Plan
        </Typography>
      </Box> */}

      <Box sx={{ ml: "1rem", mt: "20px" }}>
        {user && (
          <Box>
            <UserButton />
          </Box>
        )}
      </Box>

      <List style={{ flexGrow: 1 }}>
        <Link
          href="/"
          passHref
          style={{
            color: "#fff",
            textDecoration: "none",
            "&:hover": { color: "#fff" },
          }}
        >
          <ListItem button key="Home">
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link
          href="/chat"
          passHref
          style={{
            color: "#fff",
            textDecoration: "none",
            "&:hover": { color: "#fff" },
          }}
        >
          <ListItem button key="Chat">
            <ListItemText primary="Chat" />
          </ListItem>
        </Link>
        <Link
          href="/about"
          passHref
          style={{
            color: "#fff",
            textDecoration: "none",
            "&:hover": { color: "#fff" },
          }}
        >
          <ListItem button key="About">
            <ListItemText primary="About" />
          </ListItem>
        </Link>
        <Link
          href="/contact"
          passHref
          style={{
            color: "#fff",
            textDecoration: "none",
            "&:hover": { color: "#fff" },
          }}
        >
          <ListItem button key="Contact">
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>
        {!user ? (
          <>
            <Link
              href="/sign-in"
              passHref
              style={{
                color: "#fff",
                textDecoration: "none",
                "&:hover": { color: "#fff" },
              }}
            >
              <ListItem button key="Sign In">
                <ListItemText primary="Sign In" />
              </ListItem>
            </Link>
            <Link
              href="/sign-up"
              passHref
              style={{
                color: "#fff",
                textDecoration: "none",
                "&:hover": { color: "#fff" },
              }}
            >
              <ListItem button key="Sign Up">
                <ListItemText primary="Sign Up" />
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/profile"
              passHref
              style={{
                color: "#fff",
                textDecoration: "none",
                "&:hover": { color: "#46515A" },
              }}
            >
              <ListItem button key="Profile">
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(0,0,0,0.20)",
          boxShadow: "none",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
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
              Pop Plan
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{
              borderRadius: 0,
              boxShadow: "none",
              width: "40px",
              height: "40px",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            <MenuIcon
              sx={{
                color: "#fff",
                width: "40px",
                height: "40px",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "220px",
            boxSizing: "border-box",
            bgcolor: "rgba(0, 0, 0, 0.20)",
            zIndex: (theme) => theme.zIndex.drawer - 1,
          },
        }}
      >
        {drawerList}
      </Drawer>
    </>
  );
};

export default Navigation;
