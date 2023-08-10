const {Sequelize, DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        authorization_code: {type: DataTypes.STRING, allowNull: false},
        expires_at: {type: DataTypes.DATE, allowNull: false},
        redirect_uri: {type: DataTypes.STRING, allowNull: false},
        client_id: {type: DataTypes.STRING, allowNull: false},
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

    return sequelize.define('authorization_codes', attributes, options);
}
