import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
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

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('username', (username, ack) => {
      socket.data.username = username;
      console.log(username);
      ack();
    });

    socket.on('typing', (room, username, isTyping) => {
      if (isTyping && !typingUsers.includes(username)) {
        typingUsers.push(username);
      } else {
        typingUsers = typingUsers.filter((tu) => tu !== username);
      }
      console.log(typingUsers);
      socket.broadcast.to(room).emit('typing', typingUsers);
      // io.to(room).emit('typing', typingUsers);
    });

    socket.on('message', (room, message) => {
      io.to(room).emit('message', socket.data.username!, message);
      console.log(room, socket.data.username, message);
    });

    socket.on('join', (room, ack) => {
      // Leave all rooms before entering a new one.
      for (const roomId of socket.rooms) {
        if (roomId !== socket.id) {
          socket.leave(roomId);
        }
      }
      socket.join(room);
      console.log(socket.rooms);
      ack();
      // When a user joins a room, send an updated list of rooms to everyone
      io.emit('rooms', getRooms());
    });

    // Leave room
    socket.on('leave', (room, ack) => {
      socket.leave(room);
      ack();
      io.emit('rooms', getRooms());
    });

    // When a new user connects, send the list of rooms
    socket.emit('rooms', getRooms());
    socket.emit('typing', typingUsers);
  });

  io.listen(3000);
  console.log('listening on port 3000');
};

main();

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
