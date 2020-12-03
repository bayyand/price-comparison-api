const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');

const Province = require('./province');
const Address = require('./address');

const Country = db.define('Country', {
    countryName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

Country.hasMany(Province, { foreignKey: 'countryId', sourceKey: 'id' });
Country.hasMany(Address, { foreignKey: 'countryId', sourceKey: 'id' });
//Address.belongsTo(Province, { foreignKey: 'countryId', sourceKey: 'id' });

module.exports = Country;