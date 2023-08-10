const debug = require('debug')(`${process.env.APPNAME}:db`);
const {Sequelize} = require('sequelize');

let DB_HOST; let DB_USER; let DB_PASSWORD; let
    DB_NAME;
if (process.env.NODE_ENV === 'production') {
    DB_HOST = process.env.DB_HOST;
    DB_NAME = process.env.DB_NAME;
    DB_USER = process.env.DB_USER;
    DB_PASSWORD = process.env.DB_PASSWORD;
} else {
    DB_HOST = process.env.DEV_DB_HOST;
    DB_NAME = process.env.DEV_DB_NAME;
    DB_USER = process.env.DEV_DB_USER;
    DB_PASSWORD = process.env.DEV_DB_PASSWORD;
}

const db = {};

async function init() {
    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
        logging: false,
    });

    // init models and add them to the exported db object
    db.users = require('../models/users')(sequelize);
    db.user_accounts = require('../models/user_accounts')(sequelize);
    db.clients = require('../models/clients')(sequelize);
    db.authorization_codes = require('../models/authorization_codes')(sequelize);
    db.tokens = require('../models/tokens')(sequelize);
    db.resources = require('../models/resources')(sequelize);

    // sync all models with database
    await sequelize.sync({alter: true});

    try {
        await sequelize.authenticate();
        debug('Connection has been established successfully.');
        return sequelize;
    } catch (error) {
        debug('Unable to connect to the database:', error);
    }

    return 1;
}

init();

module.exports = db;
