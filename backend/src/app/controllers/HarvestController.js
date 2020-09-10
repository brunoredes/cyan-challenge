import { isBefore, parseISO } from 'date-fns';
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

    if (isBefore(startDateParsed, new Date())) {
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
    const { id, startDate, endDate } = request.query;

    const filter = {
      where: {},
      treatUndefinedAsNull: false,
    };

    if (id) {
      filter.where = { id };
    }

    if (startDate && endDate) {
      filter.where = {
        startDate: `${request.query.startDate}`,
        endDate: `${request.query.endDate}`,
      };
    }

    try {
      const harvest = await Harvest.findAll({
        ...filter,
      });

      if (!harvest) {
        return response.status(404).json({ error: 'harvest does not exists.' });
      }

      return response.json(harvest);
    } catch (err) {
      return response.status(500).json({ error: err.toString() });
    }
  }
}

export default new HarvestController();
