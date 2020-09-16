/* eslint-disable no-console */
import { createServer } from 'http';
import server from './app';
import setupWebSocket from './websocket';

const serverSec = createServer(server);

serverSec.listen(process.env.SERVER_PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Servidor escutando na porta ${process.env.SERVER_PORT}`);
  } else if (process.env.NODE_ENV === 'production') {
    console.warn('Servidor em ambiente de produção');
  } else if (process.env.NODE_ENV === 'test') {
    console.log('teste sendo executado');
  }
});

setupWebSocket(serverSec);
