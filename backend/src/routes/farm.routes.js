import { Router } from 'express';
import FarmController from '../app/controllers/FarmController';
import FarmValidator from '../app/validators/CreateFarmValidator';

const farmRoutes = new Router();

farmRoutes.post('/farm', FarmValidator, FarmController.createFarm);
farmRoutes.get('/farm/:harvestId', FarmController.findFarm);
// farmRoutes.get('/harvest-filtered', FarmController.filteredHarvest);

export default farmRoutes;
