import { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './communication';

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('username', (username, ack) => {
    socket.data.username = username;
    console.log(username);
    ack();
  });

  socket.on('message', (room, message) => {
    io.to(room).emit('message', socket.data.username!, message);
    console.log(room, socket.data.username, message);
  });

  socket.on('join', (room, ack) => {
    const currentRoom = Object.keys(socket.rooms).filter(
      (roomId) => roomId !== socket.id
    )[0];
    if (currentRoom) {
      socket.leave(currentRoom);
    }
    socket.join(room);
    console.log(socket.rooms);
    ack();
    // When a user joins a room, send an updated list of rooms to everyone
    io.emit('rooms', getRooms());
  });

  // When a new user connects, send the list of rooms
  socket.emit('rooms', getRooms());
});

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomsFound: string[] = [];

  for (const [username, setOfSocketIds] of rooms) {
    if (!setOfSocketIds.has(username)) {
      roomsFound.push(username);
    }
  }
  return roomsFound;
}

io.listen(3000);
console.log('listening on port 3000');
