const debug = require('debug')(`${process.env.APPNAME}:userSignIn`);
const crypto = require('crypto');
const moment = require('moment');
const bcrypt = require('bcrypt');
const responseBuilder = require('../../../utils/responseBuilder.js');
const userControllers = require('../../../controllers/users.js');
const userAccountControllers = require('../../../controllers/user_accounts.js');
const authorizationCodeControllers = require('../../../controllers/authorization_codes.js');

async function login(req, res) {
    debug('login invoked', req.ip, req.query, req.body);
    const requestedAt = new Date();
    let {username, password} = req.body;
    const {
        client_id, state, redirect_uri,
    } = req.query;

    try {
        if (!username) throw new Error('Username is missing');
        if (!password) throw new Error('Password is missing');

        username = username.trim();

        // get user
        const user = await userControllers.getUserByUsername(username);
        if (!user) throw new Error('Username is not found');
        const userId = user.dataValues.id;

        // query user account
        const userAccount = await userAccountControllers.getUserAccountByUserId(userId);
        if (!userAccount) throw new Error('User account not found');

        // compare password hash
        const isMatch = bcrypt.compareSync(password, userAccount.hash);
        if (!isMatch) {
            throw new Error('Failed to login. Code: 110');
        }

        const seed = crypto.randomBytes(256);
        const authorizationCode = crypto
            .createHash('sha1')
            .update(seed)
            .digest('hex');

        await authorizationCodeControllers.createAuthorizationCode({
            authorizationCode: authorizationCode,
            expiresAt: moment().add(5, 'minutes').toDate(),
            redirectUri: redirect_uri,
            clientId: client_id,
            userId: userId,
        });

        debug('login done');
        const dest = `${redirect_uri}?code=${authorizationCode}&state=${state}`;
        return res.send({redirect: dest});
    } catch (error) {
        debug('login failed', error);
        return responseBuilder({
            requestedAt, res, req, code: 400, message: 'Login failed',
        });
    }
}

module.exports = login;
