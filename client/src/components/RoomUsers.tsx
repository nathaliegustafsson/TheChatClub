import { useSocket } from '../context/SocketContext';

function RoomUsers() {
  const { room, usersInRooms } = useSocket();

  // Get the list of users in the current room
  const users = usersInRooms[room] || [];

  return (
    <div>
      <h3>Users in {room}</h3>
      <ul>
        {users.map((user) => (
          <li key={user.userID}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoomUsers;
