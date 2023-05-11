import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  InterServerEvents,
  Room,
  ServerToClientEvents,
  SocketData,
} from './communication';

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

const rooms: Record<string, Room> = {};
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

  // check username before connecting
  io.use(async (socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      // find existing session
      const session = await sessionsCollection.findOne({ sessionID });
      if (session) {
        socket.data.sessionID = session.sessionID;
        socket.data.userID = session.userID;
        socket.data.username = session.username;
        return next();
      }
    }
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    // create new session
    socket.data.sessionID = Date.now().toString();
    socket.data.userID = Date.now().toString();
    socket.data.username = username;
    await sessionsCollection.insertOne(socket.data as SocketData);
    next();
  });

  // connect
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Let the client know about it self
    socket.emit('session', socket.data as SocketData);

    socket.on('disconnect', () => {
      console.log('a user disconnected');

      // Find the room this socket was in
      for (const [roomName, room] of Object.entries(rooms)) {
        room.users = room.users.filter(
          (user) => user.userID !== socket.data.userID
        );
        // Notify other users in the room that this user has left
        socket.broadcast.to(roomName).emit('users', room.users);
      }
    });

    // User is typing
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

    // Message
    socket.on('message', (room, message) => {
      io.to(room).emit('message', socket.data.username!, message);
      console.log(room, socket.data.username, message);
    });

    // Join room
    socket.on('join', (room, ack) => {
      for (const roomId of socket.rooms) {
        if (roomId !== socket.id) {
          socket.leave(roomId);
          if (rooms[roomId]) {
            rooms[roomId].users = rooms[roomId].users.filter(
              (user) => user.userID !== socket.data.userID
            );
            if (rooms[roomId].users.length === 0) {
              delete rooms[roomId];
            }
          }
        }
      }
      socket.join(room);
      if (!rooms[room]) {
        rooms[room] = { name: room, users: [] };
      }
      if (socket.data.userID && socket.data.username) {
        rooms[room].users.push({
          userID: socket.data.userID,
          username: socket.data.username,
        });
      }
      io.to(room).emit('users', rooms[room].users);
      io.emit('rooms', getRooms());
      ack();
    });

    // Leave room
    socket.on('leave', (room, ack) => {
      socket.leave(room);
      if (rooms[room]) {
        rooms[room].users = rooms[room].users.filter(
          (user) => user.userID !== socket.data.userID
        );
        if (rooms[room].users.length === 0) {
          delete rooms[room];
        }
      }
      io.to(room).emit('users', rooms[room]?.users || []);
      io.emit('rooms', getRooms());
      ack();
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
