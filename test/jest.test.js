//test/jest.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'user1', password: 'password1' });
    token = res.body.token;
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'newuser', password: 'newpassword' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('username', 'newuser');
  });

  it('should not register a user with an existing username', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'user1', password: 'password1' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Username already exists');
  });

  it('should get currency rates', async () => {
    const res = await request(app)
      .get('/api/currency/rates')
      .set('Authorization', `${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should create a transaction', async () => {
    const res = await request(app)
        .post('/api/transactions/createTransaction')
        .set('Authorization', `${token}`)
        .send({
            userId: 1,
            fromCurrency: 'PLN',
            fromAccount: '123456789',
            amount: 100,
            toCurrency: 'USD',
            toAccount: '987654321'
        });
    expect(res.statusCode).toEqual(201);
});

  it('should get all transactions', async () => {
    const res = await request(app)
      .get('/api/transactions/all')
      .set('Authorization', `${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });
});
