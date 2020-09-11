import Farm from '../models/Farm';
import Field from '../models/Field';

class FieldController {
  async createField(request, response) {
    const { id, latitude, longitude, farmId } = request.body;

    if (farmId) {
      const farmExists = await Farm.findByPk(farmId);

      if (!farmExists) {
        return response.status(400).json({ error: 'Farm does not exists' });
      }
    }

    const coordinates = [latitude, longitude];

    const coords = {
      type: 'Point',
      coordinates,
    };

    if (latitude && longitude) {
      const coordinateExists = await Field.findAll({
        where: { coordinates: coords },
      });

      if (coordinateExists) {
        return response.status(400).json({ error: 'Coords already exists' });
      }
    }

    const field = await Field.create({
      id,
      coordinates: coords,
      farm_id: farmId,
    });

    return response.status(201).json(field);
  }

  async showAllFields(request, response) {
    const field = await Field.findAll({
      where: { farmId: request.query.farmId },
    });

    return response.json(field);
  }

  async showFieldFiltered(request, response) {
    const { id } = request.query;
    const field = await Field.findByPk(id);

    return response.json(field);
  }
}

export default new FieldController();
