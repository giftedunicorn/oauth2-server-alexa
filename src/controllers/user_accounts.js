const db = require('../db/index.js');

async function getUserAccountByUserId(userId) {
    return await db.user_accounts.findOne({where: {user_id: userId}});
}

async function createUserAccount({userId, hash, salt, algorithm}) {
    if (userId === undefined) throw new Error('User ID is missing');
    if (hash === undefined) throw new Error('Hash is missing');
    if (salt === undefined) throw new Error('Salt is missing');
    if (algorithm === undefined) throw new Error('Algorithm is missing');

    const userAccount = new db.user_accounts({
        user_id: userId, hash, salt, algorithm,
    });

    await userAccount.save();
    return userAccount;
}

module.exports = {
    getUserAccountByUserId,
    createUserAccount,
};
