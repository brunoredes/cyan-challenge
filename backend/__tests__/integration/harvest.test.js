import request from 'supertest';
import server from '../../src/app';

describe('Harvest endpoint', () => {
  it('should be able to create a new Harvest', async () => {
    const mill = await request(server).post('/mills').send({
      name: 'MillHarv',
    });

    const header = mill.body.id;

    const response = await request(server)
      .post('/harvest')
      .send({
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString(),
      })
      .set({ authorization: header });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('mills_id');
    expect(response.status).toBe(201);
  });
});
