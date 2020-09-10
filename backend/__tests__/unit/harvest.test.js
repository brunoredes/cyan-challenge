import request from 'supertest';
import server from '../../src/app';

describe('Harvest endpoint', () => {
  it('should be able to get all Harvest from header auth', async () => {
    const mill = await request(server).post('/mills').send({
      name: 'millzadaHav',
    });

    const header = mill.body.id;

    const response = await request(server)
      .get('/harvest')
      .set({ authorization: header });
    expect(response.status).toBe(200);
  });
});
