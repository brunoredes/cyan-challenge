import request from 'supertest';
import server from '../../src/app';

describe('Profile endpoint', () => {
  it('should be able to get the mill with ID', async () => {
    const mill = await request(server).post('/mills').send({
      name: 'mill244',
    });

    const header = mill.body.id;

    const response = await request(server)
      .get('/profile')
      .set({ authorization: header });

    expect(response.status).toBe(200);
  });
});
