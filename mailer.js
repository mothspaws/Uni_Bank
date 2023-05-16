const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "trustedsignin@gmail.com",
        pass: "tdjhejtgiucjvlaw",
    },
});

// email sender
function sendEmail(email, code_generated) {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: "trustedsignin@gmail.com",
            to: email,
            subject: "Your 6-digit authentication code",
            text: `Your authentication code is: ${code_generated}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                reject(error);
            } else {
                console.log("Email sent:", info.response);
                resolve();
            }
        });
    });
}

module.exports = {
    sendEmail,
};
