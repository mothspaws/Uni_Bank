const dbase = require("./dbase.js");

const mailer = require("./mailer.js");

// code generation
function generateSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

// email sender
function sendEmail(email, code_generated) {
    return mailer.sendEmail(email, code_generated);
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

// payment
async function payment(username, currency, amount) {
    try {
        transaction_cur = currency;
        const userHasCurrency = await haveUserCurrency(username, currency);
        if (!userHasCurrency) {
            transaction_cur = "CZK";
        }
        let canMakePayment = await controleAmount(username, transaction_cur, currency, amount, false);
        if (!canMakePayment) {
            if (transaction_cur === currency) {
                return false;
            } else {
                transaction_cur = "CZK";
                canMakePayment = await controleAmount(username, transaction_cur, currency, amount, true);
                if (!canMakePayment) {
                    return false;
                }
            }
        }
        return makePayment(username, transaction_cur, currency, amount, canMakePayment);
    } catch (error) {
        console.error("Error making payment:", error);
        return false;
    }
}

// have user currency
async function haveUserCurrency(username_have, currency_have) {
    const currencies = await dbase.getCurrencies(username_have);
    return currencies.some(row => row.currency === currency_have);
}

// adopt amount by currency
async function adoptAmountByCurrency(currency_a, amount_a) {
    const rates = await dbase.getLatestRate(currency_a);
    if (rates === undefined) {
        throw new Error(`No rates found for currency: ${currency_a}`);
    }
    updated_amount = (amount_a * rates.rate) / rates.quantity;
    return updated_amount;
}

// controle amount
async function controleAmount(username_c, transaction_cur_c, currency_c, amount_c, allowOverdraft) {
    const balance = await dbase.getBalance(username_c, transaction_cur_c);
    let updated_amount = amount_c;
    if (transaction_cur_c !== currency_c) {
        updated_amount = await adoptAmountByCurrency(currency_c, amount_c);
    }
    if (balance + updated_amount >= 0) {
        return true;
    } else if (allowOverdraft && balance + updated_amount >= -0.1 * balance) {
        return true;
    } else {
        return false;
    }
}

// make payment
async function makePayment(username_for, using_currency, payment_currency, spent_amount, isOverdraftAllowed) {
    try {
        const currentBalance = await dbase.getBalance(username_for, using_currency);
        let updated_amount = spent_amount;
        if (using_currency !== payment_currency) {
            updated_amount = await adoptAmountByCurrency(payment_currency, spent_amount);
        }
        let newBalance = Math.round((currentBalance + updated_amount) * 100) / 100;

        if (newBalance < 0 && isOverdraftAllowed) {
            // count fee for amountToBeFeed 10%
            const fee = Math.abs(newBalance) * 0.1;
            // count newBalance
            newBalance = newBalance - fee;
            // update amount
            updated_amount = updated_amount - fee;
        }

        await dbase.updateBalance(username_for, using_currency, newBalance);
        let id = 1;
        try {
            id = (await dbase.getMaxTransactionId()) + 1;
        } catch (error) {
            id = 1;
        }
        const datetime = new Date();

        dbase.insertTransaction(id, username_for, using_currency, datetime.getTime(), Math.round(updated_amount * 100) / 100);
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
    payment,
    haveUserCurrency,
    adoptAmountByCurrency,
    controleAmount,
    makePayment
};
