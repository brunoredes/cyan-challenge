import { Router } from 'express';
import ProfileController from '../app/controllers/ProfileController';

const profileRoutes = new Router();

profileRoutes.get('/profile', ProfileController.index);

export default profileRoutes;
