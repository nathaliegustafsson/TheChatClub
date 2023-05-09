import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import ChatWindow from "./ChatWindow";
import background from "/src/assets/gifstar.gif";

const drawerWidth = 280;

interface Props {
  window?: () => Window;
}

interface Item {
  title: string;
  children: string[];
}

function NestedList(props: {
  items: Item[];
  joinRoom: (localroom: string) => void;
}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleRoomClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const localRoom = (event.target as HTMLElement).dataset.localroom;
    if (localRoom) {
      console.log(localRoom);
      props.joinRoom(localRoom);
    }
  };
  return (
    <React.Fragment>
      {props.items.map((item) => (
        <React.Fragment key={item.title}>
          <ListItemButton onClick={handleClick}>
            <ListItemText>
              <Typography variant="h6">{item.title}</Typography>
            </ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((text, index) => (
                <ListItem key={text}>
                  <ListItemButton>
                    <ListItemText>
                      <Typography
                        data-localroom={text}
                        onClick={handleRoomClick}
                        variant="body1">
                        {text}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { joinRoom, username, allRooms, room, leaveRoom } = useSocket();
  const [localRoom, setLocalRoom] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalRoom(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    joinRoom(localRoom);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      style={{
        paddingLeft: "1.5rem",
        paddingTop: "0",
        backgroundImage: `url(${background})`,
      }}>
      <Toolbar />
      {/* <Typography
        variant="body2"
        sx={{ fontSize: "2rem", marginBottom: "-1rem" }}>
        The
      </Typography>
      <Typography variant="h4">CHAT CLUB</Typography> */}
      <img src="/src/assets/logo.png" alt="The Chat Club" style={imageStyle} />
      <Typography
        variant="h5"
        sx={{ marginBottom: "1rem", marginTop: "1.5rem" }}>
        Welcome {username}!
      </Typography>
      <List>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0px !important",
          }}>
          <form style={rootStyle} onSubmit={handleSubmit}>
            <TextField
              id="localroom"
              type="text"
              name="localroom"
              placeholder="Create a room"
              value={localRoom}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  width: "70%",
                  bgcolor: "#FFFFFF",
                  borderRadius: "20rem",
                  color: (theme) => theme.palette.text.secondary,
                  fontFamily: (theme) => theme.typography.body1,
                  height: "0.5rem",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}></TextField>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "60%",
                fontSize: "1rem",
                marginBottom: "1rem",
              }}>
              Create a room
            </Button>
          </form>
        </Box>
        <NestedList
          items={[
            {
              title: "Join a room",
              children: allRooms ?? [],
            },
          ]}
          joinRoom={joinRoom}
        />
        <NestedList
          items={[
            {
              title: "Users",
              children: ["Björne", "Snigel"],
            },
          ]}
          joinRoom={joinRoom}
        />
        <NestedList
          items={[
            {
              title: "DM's",
              children: ["Nathalie", "Sebastian", "Emil", "Gabriel"],
            },
          ]}
          joinRoom={joinRoom}
        />
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            className="material-symbols-outlined"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "black" }}>
            menu
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {room}
          </Typography>
          <IconButton
            className="material-symbols-outlined"
            onClick={() => leaveRoom(room!)}
            sx={{ fontSize: "2rem", color: "black" }}>
            logout
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        <ChatWindow />
      </Box>
    </Box>
  );
}

const rootStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",
};

const imageStyle: React.CSSProperties = {
  height: "9rem",
};

export default ResponsiveDrawer;
