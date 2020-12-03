const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');
const BranchOffice = require('./branchOffice');

const User = require('./user');

const Address = db.define('Address', {
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    provinceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    zipCode: {
        type: DataTypes.STRING(20)
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false
});
Address.hasMany(User, { foreignKey: 'addressId', sourceKey: 'id' });
User.belongsTo(Address, { foreignKey: 'addressId', sourceKey: 'id' });
Address.hasMany(BranchOffice, { foreignKey:'addressId', sourceKey:'id' });
BranchOffice.belongsTo(Address, { foreignKey:'addressId', sourceKey:'id' });

module.exports = Address;