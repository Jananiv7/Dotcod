var nodemailer = require('nodemailer');

async function mailSend(mailInput) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '172007@nec.edu.in',
            pass: 'iamammu@11'
        }
    });
    var mailOptions = {
        from: '172007@nec.edu.in',
        to: mailInput.to,
        subject: mailInput.subject,
        html: mailInput.html
    };
    [err, response] = await to(transporter.sendMail(mailOptions));
    if (err) TE(err);
    return response;
}
module.exports.mailSend = mailSend;