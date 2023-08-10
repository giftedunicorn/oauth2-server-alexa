const debug = require('debug')(`${process.env.APPNAME}:restToken`);
const clientController = require('../../../controllers/clients.js');
const userControllers = require('../../../controllers/users.js');
const resourceControllers = require('../../../controllers/resources.js');
const authorizationCodeControllers = require('../../../controllers/authorization_codes.js');

async function restToken(req, res) {
    debug('restToken invoked', req.ip, req.query, req.body, req.headers);
    const {
        grant_type, code, client_id, redirect_url,
    } = req.body;

    const client = await clientController.getClientByClientId(client_id);

    // validate client_id and client_secret
    const basicAuth = req.headers.authorization;
    const base64 = basicAuth.split(' ')[1];
    const [clientId, clientSecret] = Buffer.from(base64, 'base64').toString().split(':');

    if (clientId !== client.client_id) throw new Error('Not authorized');
    if (client_id !== client.client_id) throw new Error('Not authorized');
    if (client.dataValues.client_secret !== clientSecret) {
        throw new Error('Not authorized');
    }

    // validate code
    const authorizationCode = await authorizationCodeControllers.getAuthorizationCodeByCode(code);
    if (!authorizationCode) throw new Error('Not authorized');

    // validate redirect_uri
    const data_uris = client.dataValues.data_uris.split(',');
    if (!data_uris.includes(redirect_url)) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'redirect_uri is invalid',
        });
    }

    // validate grant_type
    if (!client.grants.includes(grant_type)) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'client grant_type is invalid',
        });
    }

    // get user and resource
    const userId = authorizationCode.dataValues.user_id;
    const user = await userControllers.getUserById(userId);
    const resource = await resourceControllers.getResourceByUserId(userId);
    // login to resource and get token

    // convert json to jwt
    // todo, use jwt
    const accessTokenBase64 = Buffer.from(JSON.stringify({

    })).toString('base64');

    const refreshToken = loginRes.lsToken.refresh_token;
    const expiresIn = loginRes.lsToken.expires_in;

    const result = {
        access_token: accessTokenBase64,
        token_type: 'bearer',
        refresh_token: refreshToken,
        expires_in: expiresIn,
    };
    debug('restToken DONE', result);
    return res.send(result);
}

module.exports = restToken;
