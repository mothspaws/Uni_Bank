const path = require('path');

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
    dbase.insertTransaction(1, "brusinka", "CZK", new Date("2022-12-11 13:24:43").getTime(), -90.25);
    dbase.insertTransaction(2, "brusinka", "EUR", new Date("2022-01-01 12:01:03").getTime(), 3.2);
    dbase.insertTransaction(3, "brusinka", "KRW", new Date("2023-02-01 14:52:13").getTime(), -12000.45);

    dbase.insertUser("tester_glob", "qwerty1234", "alpatkina.ec@mail.ru", 'CZK', 1200.1);
    dbase.insertCurrency("tester_glob", "EUR", 183);
    // Insert transactions for tester_glob
    dbase.insertTransaction(4, "tester_glob", "CZK", new Date("2023-01-13 15:17:09").getTime(), -50);
    dbase.insertTransaction(5, "tester_glob", "EUR", new Date("2023-03-14 12:08:56").getTime(), 2.1);
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

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client', 'public')));

if (process.env.NODE_ENV === "production") {
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
