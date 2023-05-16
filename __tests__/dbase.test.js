const mockDb = require('mock-knex');
const dbase = require('../dbase');
const tracker = mockDb.getTracker();

beforeEach(() => {
    tracker.install();
});

afterEach(() => {
    tracker.uninstall();
});

// after all delete info about test user from database
afterAll(async () => {
    await dbase.deleteUser('test');
});

test('creates tables', async () => {
    tracker.on('query', (query) => {
        expect(query.sql).toMatch(/CREATE TABLE IF NOT EXISTS/);
        query.response([]);
    });

    await dbase.createTables();
});

test('inserts a user', async () => {
    const username = 'test';
    const password = 'password';
    const email = 'test@example.com';
    const currency = 'USD';
    const balance = 1000;

    tracker.on('query', (query, step) => {
        if (step === 1) {
            expect(query.sql).toMatch(/INSERT INTO User/);
            expect(query.bindings).toEqual([username, password, email]);
        } else if (step === 2) {
            expect(query.sql).toMatch(/INSERT INTO Currencies/);
            expect(query.bindings).toEqual([username, currency, balance]);
        }
        query.response([]);
    });

    await dbase.insertUser(username, password, email, currency, balance);
});
