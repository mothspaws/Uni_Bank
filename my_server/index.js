const express = require('express');
const cors = require('cors');

const app = express();

// tools
const tools = require('./my_library.js');

// Database connection
const dbase = require('./dbase.js');
dbase.createTables();

(async () => {
  const users = await dbase.getUsers();
  if (users.length === 0) {
    dbase.insertUser("brusinka", "password1234", "viktoria.sr@icloud.com", 'CZK', 1000.25);
    dbase.insertCurrency("brusinka", "EUR", 213);
    dbase.insertCurrency("brusinka", "KRW", 2732240.44);

    // Insert transactions for brusinka
    dbase.insertTransaction(1, "brusinka", "CZK", "2023-12-01 12:00:00", -90.25);
    dbase.insertTransaction(2, "brusinka", "CZK", "2023-15-01 12:00:00", -23.1);
    dbase.insertTransaction(3, "brusinka", "CZK", "2023-17-01 12:00:00", 341.99);
    dbase.insertTransaction(4, "brusinka", "CZK", "2023-18-01 12:00:00", -123.5);
    dbase.insertTransaction(5, "brusinka", "EUR", "2023-19-01 12:00:00", 3.2);
    dbase.insertTransaction(6, "brusinka", "EUR", "2023-20-01 12:00:00", -1.2);
    dbase.insertTransaction(7, "brusinka", "EUR", "2023-21-01 12:00:00", -2.2);
    dbase.insertTransaction(8, "brusinka", "EUR", "2023-22-01 12:00:00", 3.2);
    dbase.insertTransaction(9, "brusinka", "EUR", "2023-23-01 12:00:00", 4.2);
    dbase.insertTransaction(10, "brusinka", "KRW", "2023-24-01 12:00:00", -12000.45);
    dbase.insertTransaction(11, "brusinka", "KRW", "2023-25-01 12:00:00", -3000);
    dbase.insertTransaction(12, "brusinka", "KRW", "2023-26-01 12:00:00", 2000);
    dbase.insertTransaction(13, "brusinka", "KRW", "2023-27-01 12:00:00", 1345);
    dbase.insertTransaction(14, "brusinka", "KRW", "2023-28-01 12:00:00", 1600);

    dbase.insertUser("tester_glob", "qwerty1234", "alpatkina.ec@mail.ru", 'CZK', 1200.1);
    dbase.insertCurrency("tester_glob", "EUR", 183);
    // Insert transactions for tester_glob
    dbase.insertTransaction(15, "tester_glob", "CZK", "2023-09-02 12:00:00", -50);
    dbase.insertTransaction(16, "tester_glob", "CZK", "2023-10-02 12:00:00", -100);
    dbase.insertTransaction(17, "tester_glob", "CZK", "2023-11-02 12:00:00", 200);
    dbase.insertTransaction(18, "tester_glob", "CZK", "2023-12-02 12:00:00", -300);
    dbase.insertTransaction(19, "tester_glob", "EUR", "2023-13-02 12:00:00", 2.1);
    dbase.insertTransaction(20, "tester_glob", "EUR", "2023-14-02 12:00:00", -8);
    dbase.insertTransaction(21, "tester_glob", "EUR", "2023-15-02 12:00:00", 12);
    dbase.insertTransaction(22, "tester_glob", "EUR", "2023-16-02 12:00:00", 1.2);
  }
})();

// api_cnb
const api_cnb = require('./api_cnb.js');

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// POST endpoint for login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const { result, email } = await tools.isValidLogin(username, password);

  if (result) {
    code_generated = tools.generateSixDigitCode();
    dbase.insertAuthCode(username, code_generated);
    tools.sendEmail(email, code_generated);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// POST endpoint for authentication
app.post('/api/authenticate', async (req, res) => {
  const { username, code } = req.body;

  if (await tools.isValidCode(username, code)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// POST endpoint for getting currencies
app.get('/api/user-data/:username', async (req, res) => {
  const { username } = req.params;
  const currencies = await dbase.getCurrencies(username);
  res.json({ currencies });
});

// POST endpoint for generate payments
app.post('/api/generate-payments', async (req, res) => {
  const payment = await tools.generatePayment();
  res.json(payment);
}
);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // console log rates dbase.getRates() for each rate in rates
  // dbase.getRates().then((rates) => {
  //   rates.forEach((rate) => {
  //     console.log(rate);
  //   });
  // }
  // );
});
