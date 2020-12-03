const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');

const Image = db.define('Image', {
    url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Image;