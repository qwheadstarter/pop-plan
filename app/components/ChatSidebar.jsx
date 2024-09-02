import {
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import React from "react";

/*

          {chatHistory.map((chat, index) => (
            <ListItem
              button
              key={index}
              selected={selectedChat === index}
              onClick={() => onSelectChat(index)}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary={chat.title} />
            </ListItem>
          ))}
*/

const ChatSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: "240",
        flexShrink: "240",
        [`& MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <div>
        <Typography variant="h6" sx={{ padding: 2 }}>
          Chat History
        </Typography>
        <Divider />
        <List></List>
      </div>
    </Drawer>
  );
};

export default ChatSidebar;
