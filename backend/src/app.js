import 'dotenv/config';
import 'express-async-errors';
import './database';

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';

import { swaggerDoc } from '../documentation/index';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.logs();
    this.docs();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(express.json());
  }

  logs() {
    this.server.use(
      logger('tiny', {
        skip: (request, response) => response.statusCode < 400,
      })
    );
  }

  routes() {
    this.server.use(routes);
  }

  docs() {
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  }
}

export default new App().server;
