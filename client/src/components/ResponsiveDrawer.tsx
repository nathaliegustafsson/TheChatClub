import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
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
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import ChatWindow from './ChatWindow';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

interface Item {
  title: string;
  children: string[];
}

function NestedList(props: {
  items: Item[];
  joinRoom: (room: string) => void;
}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleRoomClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const room = (event.target as HTMLElement).dataset.room;
    if (room) {
      console.log(room);
      props.joinRoom(room);
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
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    data-room={text}
                    onClick={handleRoomClick}
                    sx={{ pl: 4 }}
                  >
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
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { joinRoom, username, allRooms } = useSocket();
  const [room, setRoom] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (username) {
    joinRoom(room);
    // } else {
    //   console.log('username not found');
    // }
    // navigate('/chat');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ paddingLeft: '1.5rem', paddingTop: '0' }}>
      <Toolbar />
      <Typography
        variant="body2"
        sx={{ fontSize: '2rem', marginBottom: '-1rem' }}
      >
        The
      </Typography>
      <Typography variant="h4">CHAT CLUB</Typography>
      <Divider />
      <Typography
        variant="h5"
        sx={{ marginBottom: '2rem', marginTop: '1.5rem' }}
      >
        Welcome {username}!
      </Typography>
      <Divider />
      <List>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px !important',
            marginTop: '4rem',
          }}
        >
          <form style={rootStyle} onSubmit={handleSubmit}>
            <TextField
              id="room"
              type="text"
              name="room"
              label="Create a room"
              value={room}
              onChange={handleChange}
              sx={{
                '& .MuiInputBase-input': {
                  bgcolor: '#ECECEC',
                  borderRadius: '20rem',
                  color: (theme) => theme.palette.text.secondary,
                  fontFamily: (theme) => theme.typography.body1,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            ></TextField>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: '70%',
                fontSize: '1rem',
              }}
            >
              Create a room
            </Button>
          </form>
        </Box>
        <NestedList
          items={[
            {
              title: 'Join a room',
              children: allRooms ?? [],
            },
          ]}
          joinRoom={joinRoom}
        />
        <NestedList
          items={[
            {
              title: 'Users',
              children: ['Björne', 'Snigel'],
            },
          ]}
          joinRoom={joinRoom}
        />
        <NestedList
          items={[
            {
              title: "DM's",
              children: ['Nathalie', 'Sebastian', 'Emil', 'Gabriel'],
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            className="material-symbols-outlined"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, color: 'black' }}
          >
            menu
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {room}
          </Typography>
          <IconButton
            className="material-symbols-outlined"
            sx={{ fontSize: '2rem', color: 'black' }}
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
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

const rootStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
};

export default ResponsiveDrawer;
