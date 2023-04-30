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
    dbase.insertTransaction(1, "brusinka", "CZK", "11. 12. 2022 13:24:43", -90.25);
    dbase.insertTransaction(2, "brusinka", "EUR", "11. 01. 2023 12:01:03", 3.2);
    dbase.insertTransaction(3, "brusinka", "KRW", "12. 02. 2023 14:52:13", -12000.45);

    dbase.insertUser("tester_glob", "qwerty1234", "alpatkina.ec@mail.ru", 'CZK', 1200.1);
    dbase.insertCurrency("tester_glob", "EUR", 183);
    // Insert transactions for tester_glob
    dbase.insertTransaction(4, "tester_glob", "CZK", "13. 01. 2023 15:17:09", -50);
    dbase.insertTransaction(5, "tester_glob", "EUR", "14. 03. 2023 12:08:56", 2.1);
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
  const currencies = await dbase.getTransactions(username);
  res.json({ currencies });
});

// POST endpoint for generate payments
app.post('/api/generate-payments', async (req, res) => {
  const payment = await tools.generatePayment();
  res.json(payment);
}
);

// POST endpoint for make payments
app.post('/api/payment', async (req, res) => {
  const { username, currency, amount } = req.body;
  const result = await tools.payment(username, currency, amount);
  res.json({ result });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
