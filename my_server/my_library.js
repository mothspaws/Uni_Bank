const dbase = require("./dbase.js");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "trustedsignin@gmail.com",
        pass: "tdjhejtgiucjvlaw",
    },
});

// code generation
function generateSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

// email sender
function sendEmail(email, code_generated) {
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

async function isValidCode(username, code) {
    const user = await dbase.getAuthCode(username);
    return String(user.auth_code) === String(code);
}

// export functions
module.exports = {
    generateSixDigitCode,
    sendEmail,
    isValidLogin,
    isValidCode,
};
