const db = require('../db/index.js');

async function getClientByClientId(clientId) {
    return await db.clients.findOne({where: {client_id: clientId}});
}

async function createClient({clientName, clientId, clientSecret, dataUris, grants}) {
    if (username === undefined) throw new Error('Username is missing');

    const user = new db.clients({client_name: clientName, client_id: clientId, client_secret: clientSecret, data_uris: dataUris, grants: grants});
    await user.save();
    return user;
}

module.exports = {
    getClientByClientId,
    createClient,
};
