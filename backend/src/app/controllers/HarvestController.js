import { isBefore, parseISO } from 'date-fns';
import Harvest from '../models/Harvest';
import Mill from '../models/Mill';

class HarvestController {
  async createHarvest(request, response) {
    const { id, startDate, endDate } = request.body;

    if (request.headers.authorization) {
      const mill = await Harvest.findOne({
        where: { mills_id: request.headers.authorization },
        // include: [
        //   {
        //     association: Mill,
        //     as: 'mill',
        //     foreignKey: 'id',
        //   },
        // ],
      });

      if (!mill) {
        return response
          .status(404)
          .json({ error: 'Mill not found with this ID' });
      }
    }

    const startDateParsed = parseISO(new Date(startDate));
    const endDateParsed = parseISO(new Date(endDate));

    if (isBefore(endDateParsed, startDateParsed)) {
      return response
        .status(400)
        .json({ error: 'Past dates are not permited.' });
    }

    // const harvest = await Harvest.findOne({
    //   where: { mills_id: mill },
    //   include: [
    //     {
    //       // model: Mill,
    //       association: Mill,
    //       as: 'mill',
    //       attributes: ['id'],
    //     },
    //   ],
    // });

    // console.error(harvest);

    const createHarvest = await Harvest.create({
      id,
      startDate,
      endDate,
      mills_id: request.headers.authorization,
    });

    return response.status(201).json(createHarvest);
  }
}

export default new HarvestController();
