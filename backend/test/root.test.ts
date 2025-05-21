import request from 'supertest';
import app from '../src/index';

test('GET /api', async () => {
  const response = await request(app.callback()).get('/api');
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: 'OK' });
});