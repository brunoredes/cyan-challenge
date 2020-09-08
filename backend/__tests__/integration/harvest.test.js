import request from 'supertest';
import server from '../../src/app';

describe('Harvest endpoint', () => {
  it('should be able to create a new Harvest', async () => {
    const response = await request(server).post('/harvest').send({
      startDate: new Date().toDateString(),
      endDate: new Date().toDateString(),
    });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('startDate');
    expect(response.body).toHaveProperty('endDate');
    expect(response.status).toBe(201);
  });
});
