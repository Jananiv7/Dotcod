to = function (promise) {
    return promise
        .then(data => {
            return [null, data];
        }).catch(err => [pe(err)]);
}

pe = require('parse-error');
TE = function (err_message, log) {
    if (log === true) {
        console.error(err_message);
    }
    throw new Error(err_message);
}

ReE = function (res, err, code) {
    if (typeof code !== 'undefined') res.statusCode = code;
    return res.json({ success: false, error: err });
}

ReS = function (res, data, code) {
    let send_data = { success: true };
    if (typeof data == 'object') {
        send_data = Object.assign(data, send_data);
    }
    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

