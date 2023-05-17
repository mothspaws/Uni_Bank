const path = require('path');

const express = require('express');
const cors = require('cors');

const app = express();
// api_cnb
const api_cnb = require('./api_cnb.js');

// tools
const tools = require('./my_library.js');

// Database connection
const dbase = require('./dbase.js');
dbase.createTables();

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
    try {
      await tools.sendEmail(email, code_generated);
      res.json({ success: true });
    } catch (error) {
      // Handle the error accordingly, maybe send a specific error message or status code
      res.json({ success: false });
    }
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

// POST endpoint for make payments
app.post('/api/payment', async (req, res) => {
  try {
    const { username, currency, amount } = req.body;
    
    if (!username || !currency || !amount) {
      throw new Error('Missing required fields');
    }

    const result = await tools.payment(username, currency, amount);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ result: false });
  }
});

// POST endpoint for getting all currencies
app.get('/api/currencies', async (req, res) => {
  const currencies = await dbase.getAllCurrencies();
  res.json({ currencies });
});

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'client', 'public')));

if (process.env.NODE_ENV === "production") {
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
module.exports = app;