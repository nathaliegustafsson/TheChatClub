import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import * as React from 'react';

interface User {
  userID: string;
  username: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ ml: 3, mt: 1 }}>
        Users online
      </Typography>
      {users.map((user) => (
        <ListItem key={user.userID} sx={{ ml: 2 }}>
          <ListItemButton>
            <ListItemText>
              <Typography variant="body1">{user.username}</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default UserList;
