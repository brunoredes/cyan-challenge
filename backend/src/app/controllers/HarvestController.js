import { isBefore, parseISO } from 'date-fns';
import Harvest from '../models/Harvest';

class HarvestController {
  async createHarvest(request, response) {
    const { id, startDate, endDate } = request.body;
    const mills_id = request.headers.authorization;

    if (!mills_id || mills_id === (null || '')) {
      return response
        .status(404)
        .json({ error: 'Mill not found with this ID' });
    }

    const startDateParsed = parseISO(new Date(startDate));
    const endDateParsed = parseISO(new Date(endDate));

    if (isBefore(endDateParsed, startDateParsed)) {
      return response
        .status(400)
        .json({ error: 'Past dates are not permited.' });
    }

    const createHarvest = await Harvest.create({
      id,
      startDateParsed,
      endDateParsed,
      mills_id,
    });

    return response.status(201).json(createHarvest);
  }

  async index(request, response) {
    const { page = 1 } = request.query;

    const count = await Harvest.count({
      where: { mills_id: request.headers.authorization },
    });

    const harvest = await Harvest.findAll({
      where: { mills_id: request.headers.authorization },
      offset: (page - 1) * 5,
      limit: 5,
    });

    response.header('X-Total-Count', count);

    return response.json(harvest);
  }
}

export default new HarvestController();
