import request from 'supertest';
import app from '../app';

describe('Vayora Interiors API Integration Tests', () => {
  it('GET /api/health should return status healthy', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.service).toContain('Vayora Interiors');
  });

  it('POST /api/consultation should validate input fields and phone format', async () => {
    const res = await request(app).post('/api/consultation').send({
      name: 'R', // too short
      phone: '123',
      query: 'hi',
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
  });
});
