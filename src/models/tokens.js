const {Sequelize, DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        accesds_token: {type: DataTypes.STRING, allowNull: false},
        access_token_expires_at: {type: DataTypes.DATE, allowNull: false},
        client_id: {type: DataTypes.INTEGER, allowNull: false},
        user_id: {type: DataTypes.INTEGER, allowNull: false},
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
    };

    const options = {};

    return sequelize.define('tokens', attributes, options);
}
