const db = require('../db/index.js');

async function getUserById(userId) {
    return await db.users.findOne({where: {id: userId}});
}

async function getUserByUsername(username) {
    return await db.users.findOne({where: {username}});
}

async function createUser({username}) {
    if (username === undefined) throw new Error('Username is missing');

    const user = new db.users({username});
    await user.save();
    return user;
}

module.exports = {
    getUserByUsername,
    getUserById,
    createUser,
};
