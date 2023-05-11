import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
import { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  User,
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

  // Function to get the list of users
  function getUsers(): User[] {
    const users: User[] = [];
    for (let [id, socket] of io.of('/').sockets) {
      if (socket.data.username) {
        users.push({
          userID: id,
          username: socket.data.username,
        });
      }
    }
    return users;
  }

  // connect
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Let the client know about it self
    socket.emit('session', socket.data as SocketData);

    // Emit the list of users to all clients
    io.emit('users', getUsers());

    // notify existing users that a user has connected
    if (socket.data.username) {
      socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.data.username,
      });
    }

    // Emit the updated list of users to all clients
    io.emit('users', getUsers());

    // If a user disconnects
    socket.on('disconnect', () => {
      const users = getUsers(); // Get the current list of users
      const user = users.find((user) => user.userID === socket.id);
      if (user) {
        socket.broadcast.emit('user disconnected', user.userID);
      }
      // Emit the updated list of users to all clients
      io.emit('users', getUsers());
    });

    // User is typing
    socket.on('typing', (room, username, isTyping) => {
      if (isTyping && !typingUsers.includes(username)) {
        typingUsers.push(username);
      } else {
        typingUsers = typingUsers.filter((tu) => tu !== username);
      }
      console.log(typingUsers);
      io.to(room).emit('typing', typingUsers);
    });

    // Message
    socket.on('message', (room, message) => {
      io.to(room).emit('message', socket.data.username!, message);
      console.log(room, socket.data.username, message);
    });

    // Join room
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
