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
        startDate: '2020-10-15T15:09:24.265Z',
        endDate: '2020-10-28T15:12:24.265Z',
      })
      .set({ authorization: header });
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('mills_id');
    expect(response.status).toBe(201);
  });

  it('should not be able to create a new Harvest', async () => {
    const mill = await request(server).post('/mills').send({
      name: 'millzadas',
    });

    const header = mill.body.id;

    const response = await request(server)
      .post('/harvest')
      .send({
        startDate: '',
        endDate: '',
      })
      .set({ authorization: header });
    expect(response.status).toBe(406);
  });

  it('should not be able to set past dates', async () => {
    const mill = await request(server).post('/mills').send({
      name: 'millstDataerro',
    });

    const header = mill.body.id;

    const response = await request(server)
      .post('/harvest')
      .send({
        startDate: '2020-10-16T15:09:24.265Z',
        endDate: '2020-10-15T08:09:24.265Z',
      })
      .set({ authorization: header });
    expect(response.status).toBe(400);
  });

  it('should not be able to set start date before the current date', async () => {
    const mill = await request(server).post('/mills').send({
      name: 'millfdateerr',
    });

    const header = mill.body.id;

    const response = await request(server)
      .post('/harvest')
      .send({
        startDate: '2020-08-14T15:09:24.265Z',
        endDate: '2020-08-15T14:09:24.265Z',
      })
      .set({ authorization: header });
    expect(response.status).toBe(400);
  });
});
