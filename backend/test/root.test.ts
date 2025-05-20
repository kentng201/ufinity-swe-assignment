import request from 'supertest';
import app from '../src/index';

test('GET /', async () => {
  const response = await request(app.callback()).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: 'OK' });
});