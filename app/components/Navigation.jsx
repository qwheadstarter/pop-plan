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
      }}
    >
      <List style={{ display: "flex", flexDirection: "column" }}>
        <Link href="/" passHref>
          <ListItem button key="Home">
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/chat" passHref>
          <ListItem button key="Chat">
            <ListItemText primary="Chat" />
          </ListItem>
        </Link>
        <Link href="/about" passHref>
          <ListItem button key="About">
            <ListItemText primary="About" />
          </ListItem>
        </Link>
        <Link href="/contact" passHref>
          <ListItem button key="Contact">
            <ListItemText primary="Contact" />
          </ListItem>
        </Link>
        {!user ? (
          <>
            <Link href="/sign-in" passHref>
              <ListItem button key="Sign In">
                <ListItemText primary="Sign In" />
              </ListItem>
            </Link>
            <Link href="/sign-up" passHref>
              <ListItem button key="Sign Up">
                <ListItemText primary="Sign Up" />
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile" passHref>
              <ListItem button key="Profile">
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
            <ListItem button key="User">
              <UserButton />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <>
      <AppBar
        position="absolute"
        sx={{ bgcolor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <img
                src="/assets/icon.png"
                alt="Pop Plan Logo"
                style={{ height: "40px" }}
              />
            </Link>
          </Box>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
};

export default Navigation;
