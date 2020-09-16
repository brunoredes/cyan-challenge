import Mill from '../models/Mill';

class MillController {
  async createMill(request, response) {
    try {
      const millExists = await Mill.findOne({
        where: { name: request.body.name },
      });

      if (millExists) {
        return response.status(400).json({ error: 'Mill already exists' });
      }

      const { id, name } = await Mill.create(request.body);

      return response.status(201).json({ id, name });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showMill(request, response) {
    try {
      const mill = await Mill.findAll();

      return response.json(mill);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showFilteredMillByName(request, response) {
    try {
      const mill = await Mill.findOne({
        where: {
          name: request.query.name,
        },
      });

      if (!mill || mill === ('' || undefined)) {
        return response.status(404).json({ error: 'Mill does not exists.' });
      }

      return response.json(mill);
    } catch (err) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new MillController();
