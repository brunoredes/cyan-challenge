/* eslint-disable prettier/prettier */
import request from 'supertest';
import { validate } from 'uuid';
import server from '../../src/app';

describe('Validate UUIDV4 from primary key when mill is created', () => {
  it('should be a valid uuid v4 when mill is created', async () => {
    const response = await request(server).post('/mills').send({
      name: 'mill23'
    });

    const validUuidv4 = response.body.id;
    expect(validate(validUuidv4)).toEqual(true);
  })
})
