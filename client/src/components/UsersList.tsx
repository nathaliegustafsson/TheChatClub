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
      {users.map((user) => (
        <ListItem key={user.userID}>
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
