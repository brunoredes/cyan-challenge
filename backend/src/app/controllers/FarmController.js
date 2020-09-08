import Farm from '../models/Farm';

class FarmController {
  async createFarm(request, response) {
    const farm = Farm.findOne({
      where: { name: request.body.name },
    });

    if (farm) {
      return response.status(400).json({ error: 'farm already exists' });
    }

    return response.status(201).json(farm);
  }
}

export default new FarmController();
