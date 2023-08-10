const debug = require('debug')(`${process.env.APPNAME}:health`);
const responseBuilder = require('../../../utils/responseBuilder.js');

const health = (req, res) => {
    debug('health INVOKED');
    return responseBuilder({res, code: 200, message: 'OK!'});
};

module.exports = health;
