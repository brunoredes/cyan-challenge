import { Router } from 'express';
import millRoutes from './mill.routes';
import sessionRoutes from './session.routes';
import harvestRoutes from './harvest.routes';

const routes = new Router();

routes.use(millRoutes);
routes.use(sessionRoutes);
routes.use(harvestRoutes);

export default routes;
