const request = require('supertest');
const app = require('../index.js');
const dbase = require('../dbase.js');
let valid_code = null;
const name = 'brusinka';

describe('API Endpoints', () => {
    it('should fail to login with invalid credentials', async () => {
        dbase.insertAuthCode(name, valid_code);
        const res = await request(app)
            .post('/api/login')
            .send({
                username: name,
                password: 'password123',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(false);
    });

    it('should login with valid credentials', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                username: name,
                password: 'password1234',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it('should fail to authenticate with invalid code', async () => {
        const res = await request(app)
            .post('/api/authenticate')
            .send({
                username: name,
                code: '123456', // assume this code is incorrect
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(false);
    });

    it('should authenticate with valid code', async () => {
        const user = await dbase.getAuthCode(name);
        valid_code = user.auth_code;

        const res = await request(app)
            .post('/api/authenticate')
            .send({
                username: name,
                code: valid_code, // assume this code is correct
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it('should get user data', async () => {
        const res = await request(app)
            .get('/api/user-data/brusinka');
        expect(res.statusCode).toEqual(200);
        expect(res.body.currencies.length).toBeGreaterThan(0);
    });

    it('should get all currencies', async () => {
        const res = await request(app)
            .get('/api/currencies');
        expect(res.statusCode).toEqual(200);
        expect(res.body.currencies.length).toBeGreaterThan(0);
    });

    it('should make a payment', async () => {
        const res = await request(app)
            .post('/api/payment')
            .send({
                username: name,
                currency: 'USD',
                amount: 100,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toBe(true);
    });

    it('should fail to make a payment', async () => {
        const res = await request(app)
            .post('/api/payment')
            .send({
                username: name,
                currency: 'USD',
                amount: -1000000,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toBe(false);
    });
});
