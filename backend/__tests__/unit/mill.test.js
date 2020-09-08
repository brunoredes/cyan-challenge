import request from 'supertest';
import server from '../../src/app';

describe('Mills GET endpoint', () => {
  it('should be able to get a filtered mill', async () => {
    const mill = await request(server).post('/mills').send({
      name: 'millFiltered',
    });

    const millName = mill.body.name;

    const response = await request(server)
      .get('/mills-filtered')
      .query({ name: millName });

    expect(response.status).toBe(200);
  });

  it('should not be able to get a inexistent mill', async () => {
    const response = await request(server)
      .get('/mills-filtered')
      .query({ name: 'nomemill' });

    expect(response.status).toBe(404);
  });

  it('should be able to get all the mills', async () => {
    const response = await request(server).get('/mills');

    expect(response.status).toBe(200);
  });
});
