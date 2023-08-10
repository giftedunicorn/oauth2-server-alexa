const debug = require('debug')(`${process.env.APPNAME}:routes`);
const routeGenerator = require('../utils/routeGenerator.js');

const version = 'v1';
const handlers = require('../utils/handlerGenerator.js')(version);

const routes = [
    {
        method: 'get',
        endpoint: '/health',
        handler: handlers.health,
        middlewares: [],
    },
    // The URI where customers will be redirected in the companion app to enter login credentials.
    {
        method: 'get',
        endpoint: '/oauth/authorize',
        handler: handlers.authorize,
        middlewares: [],
    },
    // This URI will be used for both access token and token refresh requests.
    {
        method: 'post',
        endpoint: '/oauth/rest-token',
        handler: handlers.restToken,
        middlewares: [],
    },
    {
        method: 'post',
        endpoint: '/oauth/third-party/register',
        handler: handlers.register,
        middlewares: [],
    },
    {
        method: 'post',
        endpoint: '/oauth/third-party/login',
        handler: handlers.login,
        middlewares: [],
    },
];

function generator(app) {
    debug(`Generating ${version} routes`);
    routes.forEach((route) => {
        routeGenerator(app, route, version);
    });
}

module.exports = generator;
