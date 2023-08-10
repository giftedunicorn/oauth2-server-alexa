const db = require('../db/index.js');

// todo, validate code expired
async function getAuthorizationCodeByCode(code) {
    return await db.authorization_codes.findOne({where: {authorization_code: code}});
}

async function createAuthorizationCode({ authorizationCode, expiresAt, redirectUri, clientId, userId }) {
    if (!authorizationCode) throw new Error('Authorization code is missing');
    if (!expiresAt) throw new Error('Expires at is missing');
    if (!clientId) throw new Error('Client ID is missing');
    if (!userId) throw new Error('User ID is missing');

    const authorizationCode = new db.authorization_codes({ authorization_code: authorizationCode, expires_at: expiresAt, redirect_uri: redirectUri, client_id: clientId, user_id: userId });
    await authorizationCode.save();
    return authorizationCode;
}

module.exports = {
    getAuthorizationCodeByCode,
    createAuthorizationCode,
}