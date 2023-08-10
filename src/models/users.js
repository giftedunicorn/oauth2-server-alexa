const {Sequelize, DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username: {type: DataTypes.STRING, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: true},
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

    return sequelize.define('users', attributes, options);
}
