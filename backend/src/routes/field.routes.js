import { Router } from 'express';
import FieldController from '../app/controllers/FieldController';
import FieldValidator from '../app/validators/CreateFieldValidator';

const fieldRoutes = new Router();

fieldRoutes.post('/field', FieldValidator, FieldController.createField);
fieldRoutes.get('/field', FieldController.showAllFields);
fieldRoutes.get('/field-filtered', FieldController.showFieldFiltered);

export default fieldRoutes;
