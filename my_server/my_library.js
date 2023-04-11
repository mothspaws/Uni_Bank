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

// export functions
module.exports = {
    generateSixDigitCode,
    sendEmail,
};
