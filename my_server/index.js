const express = require('express');
const cors = require('cors');
const fs = require('fs');
// email sendler
const nodemailer = require("nodemailer");
code_generated = generateSixDigitCode();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "trustedsignin@gmail.com",
    pass: "tdjhejtgiucjvlaw",
  },
});


const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// function checks users.txt and returns True/False to request
function getUsers() {
    const usersFile = fs.readFileSync('users.txt', 'utf-8');
    const users = usersFile.trim().split('\n').map(line => {
        const [username, password, email] = line.split('|');
        return { username, password, email };
    });

    return users;
}

function isValidLogin(username, password) {
    const users = getUsers();
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

// code generation
function generateSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }  

// email sender
function sendEmail(email) {
    const mailOptions = {
        from: "trustedsignin@gmail.com",
        to: email,
        subject: "Your 6-digit authentication code",
        text: `Your authentication code is: ${code_generated}`,
      };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
}

//  function with logic for code validation
function isValidCode(code) {
    return code === `${code_generated}`;
}

// POST endpoint for login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const { result, email } = isValidLogin(username, password);

    if (result) {
        sendEmail(email, code_generated);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// POST endpoint for authentication
app.post('/api/authenticate', (req, res) => {
    const code = req.body.code;

    if (isValidCode(code)) {
        code_generated = generateSixDigitCode();
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
