import { isBefore, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Harvest from '../models/Harvest';
import Mill from '../models/Mill';

class HarvestController {
  async createHarvest(request, response) {
    const { id, startDate, endDate } = request.body;
    const mills_id = request.headers.authorization;

    if (mills_id) {
      const mill = await Mill.findByPk(mills_id);
      if (mills_id === (null || '') || !mill)
        return response
          .status(404)
          .json({ error: 'Mill not found with this id' });
    }

    const startDateParsed = parseISO(startDate);
    const endDateParsed = parseISO(endDate);

    if (isBefore(startDateParsed, Number(new Date() - 1))) {
      return response.status(400).json({
        error: 'It is not allowed to set start date before the current date',
      });
    }

    if (isBefore(endDateParsed, startDateParsed)) {
      return response
        .status(400)
        .json({ error: 'Past dates are not permited.' });
    }

    const createHarvest = await Harvest.create({
      id,
      startDate: startDateParsed,
      endDate: endDateParsed,
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

  async filteredHarvest(request, response) {
    const harvest = await Mill.findAll({
      where: {
        [Op.or]: [
          { startDate: request.query.startDate },
          { endDate: request.query.endDate },
          {
            [Op.and]: [
              { startDate: request.query.startDate },
              { endDate: request.query.endDate },
            ],
          },
        ],
      },
    });

    if (!harvest) {
      return response.status(404).json({ error: 'harvest does not exists.' });
    }

    return response.json(harvest);
  }
}

export default new HarvestController();
