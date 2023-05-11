import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import * as React from 'react';

interface RoomsListProps {
  rooms: string[];
  joinRoom: (localroom: string) => void;
}

const RoomsList: React.FC<RoomsListProps> = ({ rooms, joinRoom }) => {
  const handleRoomClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const localRoom = (event.target as HTMLElement).dataset.localroom;
    if (localRoom) {
      joinRoom(localRoom);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ ml: 3, mt: 1 }}>
        Join a room
      </Typography>
      {rooms.map((room) => (
        <ListItem key={room} sx={{ ml: 2 }}>
          <ListItemButton>
            <ListItemText>
              <Typography
                data-localroom={room}
                onClick={handleRoomClick}
                variant="body1"
              >
                {room}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default RoomsList;
