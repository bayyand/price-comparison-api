const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(25),
        unique: true
    },
    sex: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = User;