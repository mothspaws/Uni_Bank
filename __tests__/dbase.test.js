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

// test for insert rate
test('inserts a rate', async () => {
    const date = new Date("2023-01-13 15:17:09").getTime(); // format: YYYY-MM-DD
    const country = 'CZ';
    const currency = 'Koruna';
    const quantity = 1;
    const code = 'CZK';
    const rate = 1;

    tracker.on('query', query => {
        expect(query.sql).toMatch(/INSERT INTO Rates/);
        expect(query.bindings).toEqual([date, country, currency, quantity, code, rate]);
        query.response([]);
    });

    await dbase.insertRate(date, country, currency, quantity, code, rate);
});

// test for get rates
test('gets rates', async () => {
    const code = 'USD';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/SELECT * FROM Rates WHERE code = ? ORDER BY date DESC/);
        expect(query.bindings).toEqual([code]);
        query.response([]);
    });

    await dbase.getRates(code);
});

// test for getting latest rate
test('gets latest rate', async () => {
    const code = 'USD';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/SELECT * FROM Rates WHERE code = ? ORDER BY date DESC LIMIT 1/);
        expect(query.bindings).toEqual([code]);
        query.response([]);
    });

    await dbase.getLatestRate(code);
});

// test to delete transactions for user
test('deletes transactions for user', async () => {
    const username = 'test';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/DELETE FROM Transactions WHERE username = ?/);
        expect(query.bindings).toEqual([username]);
        query.response([]);
    });

    await dbase.deleteTransactions(username);
});

// tests for error handling
test('throws an error if no rates found', async () => {
    const code = 'KKK';

    tracker.on('query', query => {
        expect(query.sql).toMatch(/SELECT * FROM Rates WHERE code = ? ORDER BY date DESC LIMIT 1/);
        expect(query.bindings).toEqual([code]);
        query.response([]);
    });

    await expect(dbase.getLatestRate(code)).rejects.toThrow('No rates found for currency: KKK');
});

// // Error when inserting a new user into the User table
// test('error occurs when attempting to insert a new user into the User table', async () => {
//     const username = 'test';
//     const password = 'password';
//     const email = 'test@example.com';
//     const currency = 'USD';
//     const balance = 1000;
//     tracker.on('query', (query) => {
//         query.reject(new Error('insert user error'));
//     });

//     await expect(dbase.insertUser(username, password, email, currency, balance)).rejects.toThrow('insert user error');
// });

// // Error when inserting a new user into the Currencies table
// test('error occurs when attempting to insert a new user into the Currencies table', async () => {
//     const username = 'test';
//     const currency = 'USD';
//     const balance = 1000;
//     tracker.on('query', (query) => {
//         query.reject(new Error('insert currency error'));
//     });

//     await expect(dbase.insertCurrency(username, currency, balance)).rejects.toThrow('insert currency error');
// });

// // Error when inserting an authentication code
// test('error occurs when attempting to insert an authentication code', async () => {
//     const username = 'test';
//     const auth_code = 1234;
//     tracker.on('query', (query) => {
//         query.reject(new Error('insert auth code error'));
//     });

//     await expect(dbase.insertAuthCode(username, auth_code)).rejects.toThrow('insert auth code error');
// });

// // Error when retrieving an authentication code
// test('error occurs when attempting to retrieve an authentication code', async () => {
//     const username = 'test';
//     tracker.on('query', (query) => {
//         query.reject(new Error('get auth code error'));
//     });

//     await expect(dbase.getAuthCode(username)).rejects.toThrow('get auth code error');
// });

// // Error when retrieving users with their passwords
// test('error occurs when attempting to retrieve users with their passwords', async () => {
//     tracker.on('query', (query) => {
//         query.reject(new Error('get users error'));
//     });
//     await expect(dbase.getUsers()).rejects.toThrow('get users error');
// });

// // Error when retrieving transactions for a username
// test('error occurs when attempting to retrieve transactions for a username', async () => {
//     const username = 'test';
//     tracker.on('query', (query) => {
//         query.reject(new Error('get transactions error'));
//     });

//     await expect(dbase.getTransactions(username)).rejects.toThrow('get transactions error');
// });

// // Error when retrieving user's currencies
// test('error occurs when attempting to retrieve user\'s currencies', async () => {
//     const username = 'test';
//     tracker.on('query', (query) => {
//         query.reject(new Error('get currencies error'));
//     });

//     await expect(dbase.getCurrencies(username)).rejects.toThrow('get currencies error');
// });

// // Error when retrieving a user's balance for a specific currency
// test('error occurs when attempting to retrieve a user\'s balance for a specific currency', async () => {
//     const username = 'test';
//     const currency = 'USD';
//     tracker.on('query', (query) => {
//         query.reject(new Error('get balance error'));
//     });

//     await expect(dbase.getBalance(username, currency)).rejects.toThrow('get balance error');
// });

// // Error when updating a user's balance for a specific currency
// test('error occurs when attempting to update a user\'s balance for a specific currency', async () => {
//     const username = 'test';
//     const currency = 'USD';
//     const balance = 1000;
//     tracker.on('query', (query) => {
//         query.reject(new Error('update balance error'));
//     });
//     await expect(dbase.updateBalance(username, currency, balance)).rejects.toThrow('update balance error');
// });

// // Error when retrieving existing currencies
// test('error occurs when attempting to retrieve existing currencies', async () => {
//     tracker.on('query', (query) => {
//         query.reject(new Error('get existing currencies error'));
//     });
//     await expect(dbase.getExistingCurrencies()).rejects.toThrow('get existing currencies error');
// });

// // Error when retrieving the maximum transaction id
// test('error occurs when attempting to retrieve the maximum transaction id', async () => {
//     tracker.on('query', (query) => {
//         query.reject(new Error('get max transaction id error'));
//     });
//     await expect(dbase.getMaxTransactionId()).rejects.toThrow('get max transaction id error');
// });

// // Error when inserting a transaction
// test('error occurs when attempting to insert a transaction', async () => {
//     const transaction_id = 6;
//     const username = 'test';
//     const currency = 'USD';
//     const date_time = new Date().toISOString();
//     const amount = 500;
//     tracker.on('query', (query) => {
//         query.reject(new Error('insert transaction error'));
//     });
//     await expect(dbase.insertTransaction(transaction_id, username, currency, date_time, amount)).rejects.toThrow('insert transaction error');
// });

// // Error when creating tables
// test('error occurs when attempting to create tables', async () => {
//     tracker.on('query', (query) => {
//         query.reject(new Error('create tables error'));
//     });
//     await expect(dbase.createTables()).rejects.toThrow('create tables error');
// });

// // Error when deleting a user
// test('error occurs when attempting to delete a user', async () => {
//     const username = 'test';
//     tracker.on('query', (query) => {
//         query.reject(new Error('delete user error'));
//     });

//     await expect(dbase.deleteUser(username)).rejects.toThrow('delete user error');
// });

// // Error when deleting transactions for a user
// test('error occurs when attempting to delete transactions for a user', async () => {
//     const username = 'test';
//     tracker.on('query', (query) => {
//         query.reject(new Error('delete transactions error'));
//     });

//     await expect(dbase.deleteTransactions(username)).rejects.toThrow('delete transactions error');
// });