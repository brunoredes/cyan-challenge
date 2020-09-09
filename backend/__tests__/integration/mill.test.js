/* eslint-disable prettier/prettier */
import request from 'supertest';
import server from '../../src/app';
import truncate from '../util/truncate';

describe('Mill Endpoints', () => {

  afterAll(async () => {
    await truncate();
  })

  it('should be able to create a new mill', async () => {
    const response = await request(server)
      .post('/mills')
      .send({
        name: 'mill1',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should exceed the max limit of characters and not be able to create a new mill', async () => {
    const response = await request(server).post('/mills').send({
      name: 'name_greater_than_15_characters',
    });
    expect(response.status).toBe(406);
  });

  it('should not be able to create a new mill with less than 5 characters', async () => {
    const response = await request(server).post('/mills').send({
      name: 'nam3',
    });
    expect(response.status).toBe(406);
  });

  it('should not be able to create an existing mill', async () => {
    const response = await request(server).post('/mills').send({
      name: 'mill1',
    });
    expect(response.status).toBe(400);
  });

});
