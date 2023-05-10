import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  ConnectedUser,
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

const roomUsers: { [room: string]: string[] } = {};
let typingUsers: string[] = [];

const DB = 'thechatclub';
const COLLECTION = 'socket.io-adapter-events';

const mongoClient = new MongoClient(
  'mongodb+srv://admin:HFVBXYix6KJWVRtn@thechatclub.uisbxj8.mongodb.net/?retryWrites=true&w=majority'
);

const main = async () => {
  await mongoClient.connect();

  try {
    await mongoClient.db(DB).createCollection(COLLECTION, {
      capped: true,
      size: 1e6,
    });
  } catch (e) {
    // collection already exists
  }
  const mongoCollection = mongoClient.db(DB).collection(COLLECTION);
  const sessionsCollection = mongoClient
    .db(DB)
    .collection<SocketData>('sessions');

  io.adapter(createAdapter(mongoCollection));

  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    socket.data.username = username;
    next();
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('users', getConnectedUsers());

    socket.on('disconnect', () => {
      console.log('a user disconnected');

      // Remove the user from all rooms
      for (const roomId in roomUsers) {
        roomUsers[roomId] = roomUsers[roomId].filter(
          (user) => user !== socket.data.username
        );
        io.to(roomId).emit('update room users', roomUsers[roomId]);
      }

      // Update the connected users list
      io.emit('users', getConnectedUsers());
    });

    socket.on('typing', (room, username, isTyping) => {
      if (isTyping && !typingUsers.includes(username)) {
        typingUsers.push(username);
      } else {
        typingUsers = typingUsers.filter((tu) => tu !== username);
      }
      console.log(typingUsers);
      io.to(room).emit('typing', typingUsers);
    });

    socket.on('message', (room, message) => {
      io.to(room).emit('message', socket.data.username!, message);
      console.log(room, socket.data.username, message);
    });

    socket.on('join', (room, ack) => {
      // Leave all rooms before entering a new one.
      for (const roomId of socket.rooms) {
        if (roomId !== socket.id) {
          // Remove the user from the previous room's user list
          roomUsers[roomId] = roomUsers[roomId].filter(
            (user) => user !== socket.data.username
          );

          // Emit the updated user list for the previous room
          io.to(roomId).emit('update room users', roomUsers[roomId]);

          socket.leave(roomId);
        }
      }

      // Add the user to the new room's user list
      if (!roomUsers[room]) {
        roomUsers[room] = [];
      }
      if (socket.data.username) {
        roomUsers[room].push(socket.data.username);
      }

      // Emit the updated user list for the new room
      io.to(room).emit('update room users', roomUsers[room]);

      socket.join(room);
      console.log(socket.rooms);
      ack();
      io.emit('users', getConnectedUsers());
      // When a user joins a room, send an updated list of rooms to everyone
      io.emit('rooms', getRooms());
    });

    // Leave room
    socket.on('leave', (room, ack) => {
      socket.leave(room);
      // Remove the user from the room's user list
      if (roomUsers[room]) {
        roomUsers[room] = roomUsers[room].filter(
          (user) => user !== socket.data.username
        );
      } else {
        roomUsers[room] = [];
      }

      // Emit the updated user list for the room
      io.to(room).emit('update room users', roomUsers[room]);
      ack();
      io.emit('rooms', getRooms());
    });

    // When a new user connects, send the list of rooms
    socket.emit('rooms', getRooms());
    // socket.emit('typing', typingUsers);
  });

  io.listen(3000);
  console.log('listening on port 3000');
};

main();

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomsFound: string[] = [];

  for (const [roomId, setOfSocketIds] of rooms) {
    const [socketId] = [...setOfSocketIds]; // Get the first socket ID in the set
    if (roomId !== socketId) {
      roomsFound.push(roomId);
    }
  }
  return roomsFound;
}

function getConnectedUsers(): ConnectedUser[] {
  const users: ConnectedUser[] = [];
  for (let [id, connectedSocket] of io.of('/').sockets) {
    if (connectedSocket.data.username) {
      users.push({
        userID: id,
        username: connectedSocket.data.username,
      });
    }
  }
  return users;
}
