import socketio from 'socket.io';

let io;

const setupWebSocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    socket.broadcast.emit('broadcast', 'Novo dado criado');
  });
};

export default setupWebSocket;
