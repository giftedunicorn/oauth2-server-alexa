const debug = require('debug')(`${process.env.APPNAME}:authorize`);
const clientController = require('../../../controllers/clients.js');

const responseTypes = [
    'code',
];

async function authorize(req, res) {
    debug('authorize invoked', req.ip, req.query, req.body, req.headers);
    const {
        client_id, response_type, state, scope, redirect_uri,
    } = req.query;

    if (!client_id) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'client_id is missing',
        });
    }
    if (!response_type) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'response_type is missing',
        });
    }
    if (!state) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'state is missing',
        });
    }
    if (!scope) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'scope is missing',
        });
    }
    if (!redirect_uri) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'redirect_uri is missing',
        });
    }

    const client = await clientController.getClient(client_id);

    // validate scope
    if (scope !== 'all') {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'scope is invalid',
        });
    }

    // validate grant_type
    if (!client.grants.includes('authorization_code')) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'client grant_type is invalid',
        });
    }

    // validate response_type
    if (!responseTypes.includes(response_type)) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'response_type is invalid',
        });
    }

    // validate redirect_uri
    const data_uris = client.dataValues.data_uris.split(',');
    if (!data_uris.includes(redirect_uri)) {
        return res.status(400).json({
            error: 'invalid_request',
            error_description: 'redirect_uri is invalid',
        });
    }

    const redirect = `/login?client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`;
    return res.redirect(redirect);
}

module.exports = authorize;
