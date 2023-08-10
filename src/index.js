require('dotenv').config();
const debug = require('debug')(`${process.env.APPNAME}:index`);
const app = require('express')();
const path = require('path');
const server = require('http').Server(app);
const bodyParser = require('body-parser');

// env
process.env.NODE_ENV = app.get('env');
process.env.DEPLOYMENT_MODE = app.get('env');
debug('app.get(\'env\')', app.get('env'));
debug('process.env.NODE_ENV', process.env.NODE_ENV);
debug('DEPLOYMENT_MODE', process.env.DEPLOYMENT_MODE);

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({
    limit: '2mb',
    extended: true,
}));
app.use((req, res, next) => {
    res.setTimeout(30000);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// setup html routes
// user login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
// user register
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// setup api routes
const routesv1 = require('./v1/routes');

routesv1(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    debug(`${process.env.APPNAME} is running on port: ${port}`);
});

process.on('SIGINT', () => {
    server.close((err) => {
        if (err) {
            debug(err);
            process.exit(1);
        }
        process.exit(0);
    });
});
