const mailer = require('./mailer');

exports.applicationNotify = (options) => {
    const defaultOptions = {
        subject: 'Arialy - financial newsletter',
        view: 'application-news-notification'
    };

    return mailer.send(Object.assign(defaultOptions, options));
};