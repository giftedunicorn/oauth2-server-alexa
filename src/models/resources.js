const {Sequelize, DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: {type: DataTypes.INTEGER, allowNull: false},
        resource_id: {type: DataTypes.STRING, allowNull: false},
        resource_token: {type: DataTypes.STRING, allowNull: false},
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

    return sequelize.define('resources', attributes, options);
}
