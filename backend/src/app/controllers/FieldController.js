import Farm from '../models/Farm';
import Field from '../models/Field';

class FieldController {
  async createField(request, response) {
    try {
      const { id, latitude, longitude, farmId } = request.body;

      const farmExists = await Farm.findByPk(farmId);

      if (!farmExists) {
        return response.status(400).json({ error: 'farm does not exists' });
      }

      const coordinates = [latitude, longitude];

      const coords = {
        type: 'Point',
        coordinates,
        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
      };

      const field = await Field.create({
        id,
        coordinates: coords,
        farm_id: farmId,
      });

      return response.status(201).json(field);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: 'Erro interno do Servidor' });
    }
  }

  async showAllFields(request, response) {
    try {
      const field = await Field.findAll({
        where: { farm_id: request.query.farm_id },
      });

      return response.json(field);
    } catch (err) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async showFieldFiltered(request, response) {
    const { id } = request.query;
    const field = await Field.findByPk(id);

    return response.json(field);
  }
}

export default new FieldController();
