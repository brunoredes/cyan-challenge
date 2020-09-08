import socketio from 'socket.io';

let io;
const connections = [];

export const setupWebSocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    console.log(socket.id);
    const { latitude, longitude } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    });
  });
};

// export const findConnections = (coordinates, techs) => {
//   return connections.filter((connection) => {
//     return (
//       calculateDistance(coordinates, connection.coordinates) < 10 &&
//       connection.techs.some((item) => techs.includes(item))
//     );
//   });
// };

export const sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).broadcast(message, data);
  });
};
