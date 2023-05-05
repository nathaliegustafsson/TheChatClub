import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./communication";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("username", (username, ack) => {
    socket.data.name = username;
    console.log(username);
    ack();
  });

  socket.on("message", (room, message) => {
    io.to(room).emit("message", socket.data.name!, message);
    console.log(room, socket.data.name, message);
  });

  socket.on("join", (room, ack) => {
    socket.join(room);
    console.log(socket.rooms);
    ack();
    // When a user joins a room, send an updated list of rooms to everyone
    io.emit("rooms", getRooms());
  });

  // When a new user connects, send the list of rooms
  socket.emit("rooms", getRooms());
});

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomsFound: string[] = [];

  for (const [name, setOfSocketIds] of rooms) {
    if (!setOfSocketIds.has(name)) {
      roomsFound.push(name);
    }
  }
  return roomsFound;
}

io.listen(3000);
console.log("listening on port 3000");
