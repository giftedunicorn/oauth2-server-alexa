const debug = require('debug')(`${process.env.APPNAME}:routeGenerator`);

function routeGenerator(app, route, version) {
    const args = [`/api/${version}${route.endpoint}`];
    if (route.middlewares) {
        route.middlewares.forEach((middleware) => {
            args.push(middleware);
        });
    }

    args.push(route.handler);
    app[route.method](...args);
    debug(`${route.method.toUpperCase()} Endpoint -> ${args[0]}`);
}

module.exports = routeGenerator;
