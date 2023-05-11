import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import * as React from 'react';

interface RoomListProps {
  rooms: string[];
  joinRoom: (localroom: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, joinRoom }) => {
  const handleRoomClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const localRoom = (event.target as HTMLElement).dataset.localroom;
    if (localRoom) {
      joinRoom(localRoom);
    }
  };

  return (
    <React.Fragment>
      {rooms.map((room) => (
        <ListItem key={room}>
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

export default RoomList;
