import Mill from '../models/Mill';

class ProfileController {
  async index(request, response) {
    const mill_id = request.headers.authorization;

    const mill = await Mill.findAll({
      where: { id: mill_id },
    });
    return response.json(mill);
  }
}

export default new ProfileController();
