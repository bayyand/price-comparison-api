const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');
const PricesProductsBranchOffice = require('./pricesProductsBranchOffice');


const BranchOffice = db.define('BranchOffice', {
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    establishmentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

BranchOffice.hasMany(PricesProductsBranchOffice, { foreignKey: 'branchOfficeId', sourceKey: 'id' });
PricesProductsBranchOffice.belongsTo(BranchOffice, { foreignKey: 'branchOfficeId', sourceKey: 'id' });

module.exports = BranchOffice;