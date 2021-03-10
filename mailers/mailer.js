const sgMail = require('@sendgrid/mail');
const sgConfig = require('../config/sendgrid');
const ejs = require('ejs');

const render = (filename, data) => {
     return ejs.render(`${__dirname}/../views/emails/${filename}.ejs`, data);
}

exports.send = async (options) => {
    try {
        Object.assign(sgConfig.message, {
            to: options.email,
            subject: options.subject,
            html: render(options.view, options.data)
        });

        return await sgMail.send(sgConfig.message);
    } catch (err) {
        console.error(err);
    }
};