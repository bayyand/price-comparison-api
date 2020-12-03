const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');
const Address = require('./address');

const Province = db.define('Province', {
    provinceName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
});

Province.hasMany(Address, { foreignKey: 'provinceId', sourceKey: 'id' });
Address.belongsTo(Province, { foreignKey: 'provinceId', sourceKey: 'id' });

module.exports = Province;