import './bootstrap';
import 'express-async-errors';
import './database';

import express from 'express';
import * as Sentry from '@sentry/node';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import sentryConfig from './config/sentry';

import { swaggerDoc } from '../documentation/index';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.logs();
    this.docs();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(helmet());
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
    this.server.use(Sentry.Handlers.errorHandler());
  }

  docs() {
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  }
}

export default new App().server;
