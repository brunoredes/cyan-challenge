/* eslint-disable no-console */
import { createServer } from 'spdy';
import { readFileSync } from 'fs';
import { join } from 'path';
import server from './app';
import { setupWebSocket } from './websocket';

const options = {
  key: readFileSync(
    join(__dirname, '..', 'infra', 'key', 'localhost-privkey.pem')
  ),
  cert: readFileSync(
    join(__dirname, '..', 'infra', 'certificate', 'localhost-cert.pem')
  ),
};

const serverSec = createServer(options, server);

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
