-- Last modification date: 2023-04-11 13:50:20.648

-- tables
-- Table: Currencies
CREATE TABLE Currencies (
    username varchar(40) NOT NULL,
    currency character(4) NOT NULL,
    balance float NOT NULL,
    CONSTRAINT Currencies_pk PRIMARY KEY (currency,username),
    CONSTRAINT Currencies_User FOREIGN KEY (username)
    REFERENCES User (username)
);

-- Table: Rates
CREATE TABLE Rates (
    date date NOT NULL CONSTRAINT Rates_pk PRIMARY KEY,
    country varchar(30) NOT NULL,
    currency varchar(20) NOT NULL,
    quantity int NOT NULL,
    code character(4) NOT NULL,
    rate float NOT NULL
);

-- Table: Transactions
CREATE TABLE Transactions (
    transaction_id int NOT NULL CONSTRAINT Transactions_pk PRIMARY KEY,
    username varchar(40) NOT NULL,
    currency character(4) NOT NULL,
    date_time datetime NOT NULL,
    amount float NOT NULL,
    CONSTRAINT Transactions_Currencies FOREIGN KEY (currency,username)
    REFERENCES Currencies (currency,username)
);

-- Table: User
CREATE TABLE User (
    username varchar(40) NOT NULL CONSTRAINT username PRIMARY KEY,
    auth_code int,
    password varchar(40) NOT NULL,
    email varchar(40) NOT NULL
);

-- End of file.

