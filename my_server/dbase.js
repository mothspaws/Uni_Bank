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
          date DATE NOT NULL CONSTRAINT Rates_pk PRIMARY KEY,
          country VARCHAR(30) NOT NULL,
          currency VARCHAR(20) NOT NULL,
          quantity INT NOT NULL,
          code CHARACTER(4) NOT NULL,
          rate FLOAT NOT NULL
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

// Get user's currencies and balance
function getCurrencies(username) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(
                `SELECT currency, balance FROM Currencies WHERE username = ?`,
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

// export functions
module.exports = {
    createTables,
    insertUser,
    insertCurrency,
    insertAuthCode,
    getAuthCode,
    getUsers,
    getCurrencies,
};