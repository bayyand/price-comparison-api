const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');

const Price = db.define('PricesProductsBranchOffices', {
    price: {
        type: DataTypes.DOUBLE(10,2),
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Price;