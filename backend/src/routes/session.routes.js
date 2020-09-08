import { Router } from 'express';
import SessionValidator from '../app/validators/SessionValidator';
import SessionController from '../app/controllers/SessionController';

const sessionRoutes = new Router();

sessionRoutes.post('/login', SessionValidator, SessionController.login);

export default sessionRoutes;
