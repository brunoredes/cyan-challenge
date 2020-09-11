import request from 'supertest';
import server from '../../src/app';

describe('Farm endpoint', () => {
  it('should be able to create a new Farm', async () => {
    const mill = await request(server).post('/mills').send({
      name: 'millFarms',
    });

    const header = mill.body.id;

    const harvest = await request(server)
      .post('/harvest')
      .send({
        startDate: '2020-10-15T15:09:24.265Z',
        endDate: '2020-10-28T15:12:24.265Z',
      })
      .set({ authorization: header });

    const harvestId = harvest.body.id;

    const response = await request(server).post('/farm').send({
      name: 'farm24',
      harvestId,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name');
  });

  it('should return status 400 when harvest does not exists', async () => {
    const response = await request(server).post('/farm').send({
      name: 'farm29',
      harvestId: '125dd706-4106-4008-a153-db4ec19c8178',
    });
    expect(response.status).toBe(400);
  });

  it('should return status 406 when name has less than 6 characters', async () => {
    const response = await request(server).post('/farm').send({
      name: 'farm2',
      harvestId: '125dd706-4106-4008-a153-db4ec19c8178',
    });
    expect(response.status).toBe(406);
  });

  it('should return status 406 when name has more than 20 characters', async () => {
    const response = await request(server).post('/farm').send({
      name: 'DHAEGDULGASDGJASKFDLKASG',
      harvestId: '125dd706-4106-4008-a153-db4ec19c8178',
    });
    expect(response.status).toBe(406);
  });
});
