const { DataTypes } = require('sequelize');
const db = require('../data/connectionToPg');

const BranchOffice = require('./branchOffice');
const TypeOfEstablishment = require('./typeOfEstablishment');

const Establishment = db.define('Establishment', {
    establishmentName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    typeOfEstablishmentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Establishment.hasMany(BranchOffice, { foreignKey: 'establishmentId', sourceKey: 'id' });
BranchOffice.belongsTo(Establishment, { foreignKey: 'establishmentId', sourceKey: 'id' });

module.exports = Establishment;