const debug = require('debug')(`${process.env.APPNAME}:hashPassword`);
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const algorithm = 'bcrypt';
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return {hash, salt, algorithm};
    } catch (error) {
        debug(error);
        return error;
    }
}

module.exports = hashPassword;
