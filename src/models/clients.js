const {Sequelize, DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        client_name: {type: DataTypes.STRING, allowNull: false},
        client_id: {type: DataTypes.STRING, allowNull: false},
        client_secret: {type: DataTypes.STRING, allowNull: false},
        data_uris: {type: DataTypes.STRING, allowNull: false},
        grants: {type: DataTypes.STRING, allowNull: false},
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

    return sequelize.define('clients', attributes, options);
}
