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

// generatePayment amount and code
async function generatePayment() {
    const amount = Math.round(((Math.random() * 100000) - 50000) * 100) / 100;
    const codes = await dbase.getCodes();
    codes.push({ code: "CZK" }); // add czk to codes

    if (codes.length === 0) {
        console.error("Error: codes array is empty");
        return { amount: 0, currency: '' }; // Return an empty result if the codes array is empty
    }

    const currency = codes[Math.floor(Math.random() * codes.length)].code;

    return { amount, currency };
}

// payment
async function payment(username, currency, amount) {
    try {
        transaction_cur = currency;
        const userHasCurrency = await haveUserCurrency(username, currency);
        if (!userHasCurrency) {
            transaction_cur = "CZK";
        }
        const canMakePayment = await controleAmount(username, transaction_cur, amount);
        if (!canMakePayment) {
            if (transaction_cur === currency) {
                return false;
            } else {
                transaction_cur = "CZK";
                const canMakePayment = await controleAmount(username, transaction_cur, amount);
                if (!canMakePayment) {
                    return false;
                }
            }
        }
        return makePayment(username, transaction_cur, currency, amount);
    } catch (error) {
        console.error("Error making payment:", error);
        return false;
    }
}

// have user currency
async function haveUserCurrency(username, currency) {
    const currencies = await dbase.getCurrencies(username);
    return currencies.some(row => row.currency === currency);
}

// controle amount
async function controleAmount(username, currency, amount) {
    const balance = await dbase.getBalance(username, currency);
    return balance + amount > 0;
}

// make payment
async function makePayment(username, transaction_cur, currency, amount) {
    try {
        const currentBalance = await dbase.getBalance(username, transaction_cur);
        let updated_amount = amount;
        if (transaction_cur !== currency) {
            const rates = await dbase.getLatestRate(currency);
            if (rates === undefined) {
                throw new Error(`No rates found for currency: ${currency}`);
            }
            // get newest rate and quantity by date
            updated_amount = (amount * rates.rate) / rates.quantity;
        }
        const newBalance = Math.round((currentBalance + updated_amount) * 100) / 100;

        await dbase.updateBalance(username, currency, newBalance);
        let id = 1;
        try {
            id = (await dbase.getMaxTransactionId()) + 1;
        } catch (error) {
            id = 1;
        }
        const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await dbase.insertTransaction(id, username, currency, datetime, amount);
        return true;
    } catch (error) {
        console.error("Error making payment:", error);
        return false;
    }
}


// export functions
module.exports = {
    generateSixDigitCode,
    sendEmail,
    isValidLogin,
    isValidCode,
    generatePayment,
    payment,
};
