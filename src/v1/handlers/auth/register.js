const debug = require('debug')(`${process.env.APPNAME}:userSignUpStepTwo`);
const responseBuilder = require('../../../utils/responseBuilder.js');
const hashPassword = require('../../../utils/hashPassword.js');
const userControllers = require('../../../controllers/users.js');
const userAccountControllers = require('../../../controllers/user_accounts.js');
const resourceControllers = require('../../../controllers/resources.js');

async function register(req, res) {
    debug('register invoked', req.ip, req.body);
    const requestedAt = new Date();
    let {username, password, passwordRepeat} = req.body;
    const {
        client_id, response_type, state, scope, redirect_uri,
    } = req.query;

    try {
        if (!username) throw new Error('Username is missing');
        if (!password) throw new Error('Password is missing');
        if (!passwordRepeat) throw new Error('Repeat password is missing');
        if (passwordRepeat !== password) throw new Error('Password does not match');

        username = username.trim();

        // get user
        const user = await userControllers.getUserByUsername(username);
        if (user) throw new Error('Username already exists');

        // create user
        const newUser = await userControllers.createUser(username);
        const userId = newUser.dataValues.id;

        // hash password
        const {hash, salt, algorithm} = await hashPassword(password);

        // create user account
        await userAccountControllers.createUserAccount(userId, hash, salt, algorithm);

        // todo, register with client
        const resourceId = ''
        const resourceToken = ''
        await resourceControllers.createResource({userId, resourceId, resourceToken});

        debug('register done');
        const dest = `/login?client_id=${client_id}&response_type=${response_type}&state=${state}&scope=${scope}&redirect_uri=${redirect_uri}`;
        return res.send({redirect: dest});
    } catch (error) {
        debug('register failed', error);
        return responseBuilder({
            requestedAt, res, req, code: 400, message: 'register failed',
        });
    }
}

module.exports = register;
