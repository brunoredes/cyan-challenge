import { Router } from 'express';
import millRoutes from './mill.routes';
import sessionRoutes from './session.routes';
import harvestRoutes from './harvest.routes';
import profileRoutes from './profile.routes';
import farmRoutes from './farm.routes';
import fieldRoutes from './field.routes';

const routes = new Router();

routes.use(millRoutes);
routes.use(sessionRoutes);
routes.use(profileRoutes);
routes.use(harvestRoutes);
routes.use(farmRoutes);
routes.use(fieldRoutes);

export default routes;
