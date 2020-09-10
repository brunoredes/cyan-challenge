import Mill from '../models/Mill';

class MillController {
  async createMill(request, response) {
    const millExists = await Mill.findOne({
      where: { name: request.body.name },
    });

    if (millExists) {
      return response.status(400).json({ error: 'Mill already exists' });
    }

    const { id, name } = await Mill.create(request.body);

    return response.status(201).json({ id, name });
  }

  async showMill(request, response) {
    const mill = await Mill.findAll();

    return response.json(mill);
  }

  async showFilteredMillByName(request, response) {
    const mill = await Mill.findOne({
      where: {
        name: request.query.name,
      },
    });

    if (!mill || mill === ('' || undefined)) {
      return response.status(404).json({ error: 'Mill does not exists.' });
    }

    return response.json(mill);
  }
}

export default new MillController();
