const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');
const UserService = require('../lib/services/UserService');
const { exchangeCodeForToken } = require('../lib/utils/github');

jest.mock('../lib/utils/github.js');
// jest.mock('../lib/utils/github.js', () => {
//   return {
//     exchangeCodeForToken: async (code) => 'MOCKED_ACCESS_TOKEN',
//     getGithubProfile: async (token) => ({
//       username: 'wally',
//       photoUrl: 'http://image.com/image.png'
//     }),
//   };
  
// });
// jest.mock('../lib/middleware/authenticate.js', () => {
//   return (req, res, next) => {
//     req.user = {
//       username: 'wally',
//       photoUrl: 'http://image.com/image.png',
//     };
//     next();
//   };
// });

describe('Gitty2 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github oauth page upon login', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  

  it('should login and redirect users to /api/v1/posts', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/posts')
      .redirects(1);

    expect(res.req.path).toEqual('/api/v1/posts');
  });

  it('creates a post', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback');

    return agent
      .post('/api/v1/posts')
      .send({ text: 'I am the coolest flash' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          text: 'I am the coolest flash',
          username: 'wally',
        });
      });
  });

  it('logout a user', async () => {
    await GithubUser.insert({
      username: 'wally',
      photoUrl: 'http://image.com/image.png',
    });
    const res = await request(app)
      .delete('/api/v1/github/sessions').send();
    expect(res.body).toEqual({ success: true, message: 'Signed Out' });
  });

});
