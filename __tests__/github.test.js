const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('github auth', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  test('/api/v1/github/login should redirect to the github oauth page', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });
  it('/api/v1/github/callback should login users and redirect to dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    expect(res.body).toEqual({
      id: expect.any(String),
      login: 'fake_github_user',
      email: 'not-real@example.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  test('DELETE /api/v1/github signs out logged in user', async () => {
    await request.agent(app).get('/api/v1/github/callback?code=42');
    const res = await request.agent(app).delete('/api/v1/github');
    // expect(res.status).toBe(204);
    expect(res.body.message).toEqual('You logged out successfully!');
    const res2 = await request.agent(app).get('/api/v1/github/dashboard');
    expect(res2.status).toBe(401);
  });
});
