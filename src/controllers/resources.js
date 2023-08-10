const db = require('../db/index.js');

async function getResourceByUserId(userId) {
    return await db.resources.findOne({where: {user_id: userId}});
}

async function createResource({userId, resourceId, resourceToken}) {
    if (userId === undefined) throw new Error('User ID is missing');
    if (resourceId === undefined) throw new Error('Resource ID is missing');
    if (resourceToken === undefined) throw new Error('Resource Token is missing');

    const resource = new db.resources({user_id: userId, resource_id: resourceId, resource_token: resourceToken});
    await resource.save();
    return resource;
}

module.exports = {
    getResourceByUserId,
    createResource,
};
