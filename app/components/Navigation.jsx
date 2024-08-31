"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        <ListItem button key="Home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Chat">
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button key="About">
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button key="Contact">
          <ListItemText primary="Contact" />
        </ListItem>
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
