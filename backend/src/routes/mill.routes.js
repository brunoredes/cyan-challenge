import { Router } from 'express';
import MillValidator from '../app/validators/CreateMillValidator';
import MillController from '../app/controllers/MillController';

const millRoutes = new Router();

millRoutes.post('/mills', MillValidator, MillController.createMill);
millRoutes.get('/mills', MillController.showMill);
millRoutes.get('/mills-filtered', MillController.showFilteredMillByName);

export default millRoutes;
