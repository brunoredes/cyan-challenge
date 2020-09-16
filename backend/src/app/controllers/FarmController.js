/* eslint-disable no-unused-vars */
import Farm from '../models/Farm';
import Harvest from '../models/Harvest';

class FarmController {
  async createFarm(request, response) {
    try {
      const { id, name, harvestId } = request.body;

      const harvest = await Harvest.findByPk(harvestId);

      if (!harvest) {
        return response.status(400).json({ error: 'Harvest does not exists' });
      }

      const farm = await Farm.findOne({
        where: { name },
      });

      if (farm) {
        return response.status(400).json({ error: 'farm already exists' });
      }

      const createdFarm = await Farm.create({
        id,
        name,
        harvest_id: harvestId,
      });

      return response.status(201).json(createdFarm);
    } catch (err) {
      return response.status(500).json({ error: 'Erro do Servidor' });
    }
  }

  async findFarm(request, response) {
    try {
      const { harvestId } = request.params;

      const harvest = await Harvest.findByPk(harvestId);

      if (!harvest) {
        return response.status(400).json({ error: 'Harvest does not exists' });
      }

      const farm = await Farm.findAll({
        where: { harvest_id: harvestId },
      });

      if (!farm) {
        return response.status(400).json({ error: 'Farm does not exists' });
      }

      return response.json(farm);
    } catch (err) {
      return response.status(500).json({ error: 'Erro do Servidor' });
    }
  }
}

export default new FarmController();
