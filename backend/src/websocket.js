import socketio from 'socket.io';

let io;

const setupWebSocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    const broadcast1 = socket.broadcast.emit(
      'broadcast',
      'Novo alguma coisa criado'
    );
    console.log(broadcast1);
  });
};

export default setupWebSocket;

// export const findConnections = (coordinates, techs) => {
//   return connections.filter((connection) => {
//     return (
//       calculateDistance(coordinates, connection.coordinates) < 10 &&
//       connection.techs.some((item) => techs.includes(item))
//     );
//   });
// };
