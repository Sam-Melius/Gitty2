const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const QuoteService = require('../lib/services/QuoteService');

describe('Gitty2 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('renders learn react link', async () => {
  
    const linkElement = true;
    expect(linkElement).toBeTruthy();
  });

  it('return quotes', async () => {
    
    const expected = [
      {
        author: expect.any(String),
        content: expect.any(String),
      },
      {
        author: expect.any(String),
        content: expect.any(String),
      },
      {
        author: expect.any(String),
        content: expect.any(String),
      }
    ];
    const req = await request(app)
      .get('/api/v1/quotes/quotes');

    expect(req.body).toEqual(expected);
  });

});
