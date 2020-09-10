import { Router } from 'express';
import HarvestController from '../app/controllers/HarvestController';
import HarvestValidator from '../app/validators/CreateHarvestValidator';

const harvestRoutes = new Router();

harvestRoutes.post(
  '/harvest',
  HarvestValidator,
  HarvestController.createHarvest
);
harvestRoutes.get('/harvest', HarvestController.index);
harvestRoutes.get('/harvest-filtered', HarvestController.filteredHarvest);

export default harvestRoutes;
