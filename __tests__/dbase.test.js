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

test('inserts a currency', async () => {
    const username = 'test';
    const currency = 'EUR';
    const balance = 2000;

    tracker.on('query', query => {
        expect(query.sql).toMatch(/INSERT INTO Currencies/);
        expect(query.bindings).toEqual([username, currency, balance]);
        query.response([]);
    });

    await dbase.insertCurrency(username, currency, balance);
});

test('inserts a transaction', async () => {
    const transaction_id = 6;
    const username = 'test';
    const currency = 'USD';
    const date_time = new Date().toISOString();
    const amount = 500;

    tracker.on('query', query => {
        expect(query.sql).toMatch(/INSERT INTO Transactions/);
        expect(query.bindings).toEqual([transaction_id, username, currency, date_time, amount]);
        query.response([]);
    });

    await dbase.insertTransaction(transaction_id, username, currency, date_time, amount);
});

test('inserts an auth code', async () => {
    const username = 'test';
    const auth_code = 1234;

    tracker.on('query', query => {
        expect(query.sql).toMatch(/UPDATE User SET auth_code = \? WHERE username = \?/);
        expect(query.bindings).toEqual([auth_code, username]);
        query.response([]);
    });

    await dbase.insertAuthCode(username, auth_code);
});

test('inserts a rate', async () => {
    const date = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD
    const country = 'USA';
    const currency = 'Dollar';
    const quantity = 1;
    const code = 'USD';
    const rate = 1;

    tracker.on('query', query => {
        expect(query.sql).toMatch(/INSERT INTO Rates/);
        expect(query.bindings).toEqual([date, country, currency, quantity, code, rate]);
        query.response([]);
    });

    await dbase.insertRate(date, country, currency, quantity, code, rate);
});

test('gets users', async () => {
    tracker.on('query', query => {
        expect(query.sql).toMatch(/SELECT username, password, email FROM User/);
        query.response([]);
    });

    await dbase.getUsers();
});

test('gets currencies', async () => {
    const username = 'test';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/SELECT DISTINCT currency FROM Currencies WHERE username = \?/);
        expect(query.bindings).toEqual([username]);
        query.response([]);
    });

    await dbase.getCurrencies(username);
});

test('gets transactions', async () => {
    const username = 'test';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/SELECT c.currency, c.balance, t.date_time, t.amount FROM Currencies c LEFT JOIN Transactions t ON c.currency = t.currency AND c.username = t.username WHERE c.username = \? ORDER BY t.date_time DESC/);
        expect(query.bindings).toEqual([username]);
        query.response([]);
    });

    await dbase.getTransactions(username);
});

test('gets auth code', async () => {
    const username = 'test';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/SELECT auth_code FROM User WHERE username = \?/);
        expect(query.bindings).toEqual([username]);
        query.response([]);
    });

    await dbase.getAuthCode(username);
});

test('gets latest rate', async () => {
    const code = 'USD';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/SELECT * FROM Rates WHERE code = ? ORDER BY date DESC LIMIT 1/);
        expect(query.bindings).toEqual([code]);
        query.response([]);
    });

    await dbase.getLatestRate(code);
});

test('deletes user', async () => {
    const username = 'test';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/DELETE FROM User WHERE username = ?/);
        expect(query.bindings).toEqual([username]);
        query.response([]);
    });

    await dbase.deleteUser(username);
});

test('deletes transactions for user', async () => {
    const username = 'test';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/DELETE FROM Transactions WHERE username = ?/);
        expect(query.bindings).toEqual([username]);
        query.response([]);
    });

    await dbase.deleteTransactions(username);
});
