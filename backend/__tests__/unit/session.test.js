import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import server from '../../src/app';

describe('Session endpoint', () => {
  it('should be able to create an account and sign in', async () => {
    const newMill = await request(server).post('/mills').send({
      name: 'newmill',
    });

    const millId = newMill.body.id;

    const response = await request(server).post('/login').send({
      id: millId,
    });
    expect(response.status).toBe(200);
  });

  it('should not be able to sign in with a inexistent UUID', async () => {
    const response = await request(server).post('/login').send({
      id: uuidv4(),
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to sign in with a id not uuid', async () => {
    const response = await request(server).post('/login').send({
      id: 'gdias7agsls',
    });

    expect(response.status).toBe(406);
  });

  it('should not be able to sign in with a id not uuid', async () => {
    const response = await request(server).post('/login').send({
      id: '15684133483',
    });

    expect(response.status).toBe(406);
  });
});
