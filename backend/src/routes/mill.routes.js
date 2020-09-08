import { Router } from 'express';
import MillValidator from '../app/validators/CreateMillValidator';
import MillController from '../app/controllers/MillController';

const millRoutes = new Router();

millRoutes.get('/mills', MillController.showMill);
millRoutes.get('/mills-filtered', MillController.showFilteredMillByName);

millRoutes.post('/mills', MillValidator, MillController.createMill);

export default millRoutes;
