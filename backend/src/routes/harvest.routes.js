import { Router } from 'express';
import HarvestController from '../app/controllers/HarvestController';

const harvestRoutes = new Router();

harvestRoutes.post('/harvest', HarvestController.createHarvest);
harvestRoutes.get('/harvest', HarvestController.index);

export default harvestRoutes;
