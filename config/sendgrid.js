const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(`${process.env.SG_KEY}`);

const message = {};
message.from = 'contact@arialy.com';
message.mail_settings = {
    sandbox_mode: {
        enable: true
    }
};

exports.message = message;