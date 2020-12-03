const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');

const Image = require('./image');
const PricesProductsBranchOffice = require('./pricesProductsBranchOffice');

const Product = db.define('Product', {
    barCode: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    productName: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Product.hasMany(Image, { foreignKey: 'productId', sourceKey: 'id' });
Image.belongsTo(Product, { foreignKey: 'productId', sourceKey: 'id' });
Product.hasMany(PricesProductsBranchOffice, { foreignKey: 'productId', sourceKey: 'id' });
PricesProductsBranchOffice.belongsTo(Product, { foreignKey: 'productId', sourceKey: 'id' });

module.exports = Product;