const debug = require('debug')(`${process.env.APPNAME}:responseBuilder`);

function responseBuilder({
    res, code, message = '', data = null,
}) {
    const resultData = {
        respondedAt: new Date(),
        status: '',
        message,
        data,
    };

    if (code >= 200 && code <= 299) {
        resultData.status = 'success';
    } else if (code >= 400) {
        resultData.status = 'error';
    }

    return res.status(code).send(resultData);
}

module.exports = responseBuilder;
