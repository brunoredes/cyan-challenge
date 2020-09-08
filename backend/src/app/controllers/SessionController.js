import Mill from '../models/Mill';

class SessionController {
  async login(request, response) {
    const { id } = request.body;

    const mill = await Mill.findOne({
      where: {
        id,
      },
    });

    if (!mill) {
      return response.status(400).json({ error: 'No mill found with this ID' });
    }

    return response.json(mill);
  }
}
export default new SessionController();
