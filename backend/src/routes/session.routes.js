import { Router } from 'express';
import SessionValidator from '../app/validators/SessionValidator';
import SessionController from '../app/controllers/SessionController';

const sessionRoutes = new Router();

sessionRoutes.post('/sessions', SessionValidator, SessionController.login);

export default sessionRoutes;
