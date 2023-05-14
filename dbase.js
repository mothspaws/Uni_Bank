const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bank_dbase.db");

// Create tables
function createTables() {
    db.serialize(() => {
        // Create User table
        db.run(`
        CREATE TABLE IF NOT EXISTS User (
          username VARCHAR(40) PRIMARY KEY,
          auth_code INT,
          password VARCHAR(40) NOT NULL,
          email VARCHAR(40) NOT NULL
        );
      `);

        // Create Currencies table
        db.run(`
        CREATE TABLE IF NOT EXISTS Currencies (
          username VARCHAR(40) NOT NULL,
          currency CHARACTER(4) NOT NULL,
          balance FLOAT NOT NULL,
          CONSTRAINT Currencies_pk PRIMARY KEY (currency, username),
          CONSTRAINT Currencies_User FOREIGN KEY (username)
          REFERENCES User (username)
        );
      `);

        // Create Rates table
        db.run(`
        CREATE TABLE IF NOT EXISTS Rates (
            date date NOT NULL,
            country varchar(30) NOT NULL,
            currency varchar(20) NOT NULL,
            quantity int NOT NULL,
            code character(4) NOT NULL,
            rate float NOT NULL,
            CONSTRAINT Rates_pk PRIMARY KEY (date,code)
        );
      `);

        // Create Transactions table
        db.run(`
        CREATE TABLE IF NOT EXISTS Transactions (
          transaction_id INT NOT NULL CONSTRAINT Transactions_pk PRIMARY KEY,
          username VARCHAR(40) NOT NULL,
          currency CHARACTER(4) NOT NULL,
          date_time DATETIME NOT NULL,
          amount FLOAT NOT NULL,
          CONSTRAINT Transactions_Currencies FOREIGN KEY (currency, username)
          REFERENCES Currencies (currency, username)
        );
      `);
    });
}

// Insert new user and currency for him
function insertUser(username, password, email, currency, balance) {
    db.serialize(() => {
        db.run(
            `INSERT INTO User (username, password, email) VALUES (?, ?, ?)`,
            [username, password, email],
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );

        db.run(
            `INSERT INTO Currencies (username, currency, balance) VALUES (?, ?, ?)`,
            [username, currency, balance],
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
}

// Insert new currency for user
function insertCurrency(username, currency, balance) {
    db.serialize(() => {
        db.run(
            `INSERT INTO Currencies (username, currency, balance) VALUES (?, ?, ?)`,
            [username, currency, balance],
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
}

// Insert authentication code to existing user
function insertAuthCode(username, auth_code) {
    db.serialize(() => {
        db.run(
            `UPDATE User SET auth_code = ? WHERE username = ?`,
            [auth_code, username],
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
}

// Get authentication code for user
function getAuthCode(username) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(
                `SELECT auth_code FROM User WHERE username = ?`,
                [username],
                function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                    resolve(row);
                }
            );
        });
    });
}

// Get users with their passwords
function getUsers() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const query = "SELECT username, password, email FROM User";
            const users = [];

            db.each(
                query,
                (err, row) => {
                    if (err) {
                        console.error("Error getting users:", err);
                        reject(err);
                    } else {
                        users.push(row);
                    }
                },
                () => {
                    resolve(users);
                }
            );
        });
    });
}

// Get user's currencies and balance, including transactions
function getTransactions(username) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(
                `SELECT c.currency, c.balance, t.date_time, t.amount
                 FROM Currencies c
                 LEFT JOIN Transactions t ON c.currency = t.currency AND c.username = t.username
                 WHERE c.username = ?
                 ORDER BY t.date_time DESC`,
                [username],
                function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                    // Create an object to store currencies with an empty transactions array
                    const currencies = {};
                    rows.forEach((row) => {
                        if (!currencies[row.currency]) {
                            currencies[row.currency] = {
                                currency: row.currency,
                                balance: row.balance,
                                transactions: [],
                            };
                        }
                        if (row.date_time && row.amount) {
                            currencies[row.currency].transactions.push({
                                dateTime: row.date_time,
                                amount: row.amount,
                            });
                        }
                    });
                    // Convert the currencies object to an array
                    resolve(Object.values(currencies));
                }
            );
        });
    });
}

// Get max transaction id
function getMaxTransactionId() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(
                `SELECT MAX(transaction_id) AS max_id FROM Transactions`,
                function (err, row) {
                    if (err) {
                        console.log(err);
                    }
                    resolve(row.max_id);
                }
            );
        });
    });
}

// Get user's currencies
function getCurrencies(username) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(
                `SELECT DISTINCT currency FROM Currencies WHERE username = ?`,
                [username],
                function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                    resolve(rows);
                }
            );
        });
    });
}

// Get all existing currensies
function getAllCurrencies() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(
                `SELECT DISTINCT code FROM Rates`,
                function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                    resolve(rows);
                }
            );
        });
    });
}

// Get user's balance for a specific currency
function getBalance(username, currency) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(
                `SELECT balance FROM Currencies WHERE username = ? AND currency = ?`,
                [username, currency],
                function (err, row) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(row.balance);
                }
            );
        });
    });
}

// Update user's balance for a specific currency
function updateBalance(username, currency, newBalance) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(
                `UPDATE Currencies SET balance = ? WHERE username = ? AND currency = ?`,
                [newBalance, username, currency],
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(true);
                }
            );
        });
    });
}

// Insert transaction
function insertTransaction(transaction_id, username, currency, date_time, amount) {
    db.serialize(() => {
        db.run(
            `INSERT INTO Transactions (transaction_id, username, currency, date_time, amount) VALUES (?, ?, ?, ?, ?)`,
            [transaction_id, username, currency, date_time, amount],
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Transaction ${transaction_id} inserted successfully.`);
                }
            }
        );
    });
}

// Insert rate
function insertRate(date, country, currency, quantity, code, rate) {
    db.serialize(() => {
        db.run(
            `INSERT INTO Rates (date, country, currency, quantity, code, rate) VALUES (?, ?, ?, ?, ?, ?)`,
            [date, country, currency, quantity, code, rate],
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Rate for ${code} inserted successfully.`);
                }
            }
        );
    });
}

// Get rates
function getRates() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const query = "SELECT * FROM Rates";
            const rates = [];

            db.each(
                query,
                (err, row) => {
                    if (err) {
                        console.error("Error getting rates:", err);
                        reject(err);
                    } else {
                        rates.push(row);
                    }
                },
                () => {
                    resolve(rates);
                }
            );
        });
    });
}

// Get latest rate and quantity for a specific currency
function getLatestRate(code) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const query = `SELECT date, quantity, rate FROM Rates WHERE code = ? ORDER BY date DESC LIMIT 1`;
            db.get(
                query,
                [code],
                function (err, row) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(row);
                }
            );
        });
    });
}

// export functions
module.exports = {
    db,
    createTables,
    insertUser,
    insertCurrency,
    insertAuthCode,
    getAuthCode,
    getUsers,
    getTransactions,
    getMaxTransactionId,
    getCurrencies,
    getAllCurrencies,
    getBalance,
    updateBalance,
    insertTransaction,
    insertRate,
    getRates,
    getLatestRate,
};
