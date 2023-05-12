export const receiveAndSendMessage =
  (io: any, socket: any) => (room: any, message: any) => {
    io.to(room).emit('message', socket.data.username!, message);
    console.log(room, socket.data.username, message);
  };

// function hello(socket: any) {
//   return function(message: string) {
//     socket....
//   }
// }
