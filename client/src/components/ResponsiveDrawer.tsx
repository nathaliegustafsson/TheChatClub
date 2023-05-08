import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useSocket } from "../context/SocketContext";
import ChatWindow from "./ChatWindow";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

interface Item {
  title: string;
  children: string[];
}

function NestedList(props: { items: Item[] }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
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
                <ListItem key={text} disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText>
                      <Typography variant="body1">{text}</Typography>
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
  const { username } = useSocket();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ paddingLeft: "1.5rem", paddingTop: "0" }}>
      <Toolbar />
      <Typography
        variant="body2"
        sx={{ fontSize: "2rem", marginBottom: "-1rem" }}
      >
        The
      </Typography>
      <Typography variant="h4">CHAT CLUB</Typography>
      <Divider />
      <Typography
        variant="h5"
        sx={{ marginBottom: "2rem", marginTop: "1.5rem" }}
      >
        Welcome {username}!
      </Typography>
      <Divider />
      <List>
        <Button
          variant="contained"
          sx={{ fontSize: "1rem", marginBottom: "1rem" }}
        >
          Create a room
        </Button>
        <NestedList
          items={[
            {
              title: "Join a room",
              children: ["Kodsnack", "TheRockiRock", "Bumpy Monster"],
            },
          ]}
        />
        <NestedList
          items={[
            {
              title: "Users online",
              children: ["Nathalie", "Sebastian", "Lisa Marie"],
            },
          ]}
        />
        <NestedList
          items={[
            {
              title: "DM's",
              children: ["Nathalie", "Sebastian", "Emil", "Gabriel"],
            },
          ]}
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
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            className="material-symbols-outlined"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "black" }}
          >
            menu
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Room Name
          </Typography>
          <IconButton
            className="material-symbols-outlined"
            sx={{ fontSize: "2rem", color: "black" }}
          >
            logout
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu"
      >
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
          }}
        >
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
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <ChatWindow />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
