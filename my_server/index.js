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
    dbase.insertUser("tester_glob", "qwerty1234", "alpatkina.ec@mail.ru", 'CZK', 1200.1);
    dbase.insertCurrency("brusinka", "EUR", 213);
    dbase.insertCurrency("brusinka", "KRW", 2732240.44);
    dbase.insertCurrency("tester_glob", "EUR", 183);
  }
})();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

async function isValidLogin(username, password) {
  const users = await dbase.getUsers();
  let result = false;
  let email = null;

  users.forEach(user => {
    if (user.username === username && user.password === password) {
      result = true;
      email = user.email;
    }
  });
  return { result, email };
}

// POST endpoint for login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const { result, email } = await isValidLogin(username, password);

  if (result) {
    code_generated = tools.generateSixDigitCode();
    dbase.insertAuthCode(username, code_generated);
    tools.sendEmail(email, code_generated);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

async function isValidCode(username, code) {
  const user = await dbase.getAuthCode(username);
  return String(user.auth_code) === String(code);
}

// POST endpoint for authentication
app.post('/api/authenticate', async (req, res) => {
  const { username, code } = req.body;

  if (await isValidCode(username, code)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
