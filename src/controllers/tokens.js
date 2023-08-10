const db = require('../db/index.js');

async function createToken({user_id, client_id, access_token, refresh_token, expires_at}) {
    if (user_id === undefined) throw new Error('User ID is missing');
    if (client_id === undefined) throw new Error('Client ID is missing');
    if (access_token === undefined) throw new Error('Access token is missing');
    if (refresh_token === undefined) throw new Error('Refresh token is missing');
    if (expires_at === undefined) throw new Error('Expires at is missing');

    const token = new db.tokens({user_id, client_id, access_token, refresh_token, expires_at});
    await token.save();
    return token;
}

module.exports = {
    createToken,
};
