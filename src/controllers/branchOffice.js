const BranchOffice = require('../models/branchOffice');
const Address = require('../models/address');
const { sequelize } = require('../models/branchOffice');

const getBranchOfficesByEstablishment = async (req, res) => {
    const { establishmentId } = req.params;
    try {
        const branchOffices = await BranchOffice.findAll({
            where: {
                establishmentId,
            }
        });
        res.status(200).json(branchOffices);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador'
        });
    }
}

const registerBranchOffice = async (req, res) => {
    const { countryId, provinceId, zipCode, city, establishmentId } = req.body;
    const t = await sequelize.transaction();
    try {
        const address = await Address.create({
            countryId,
            provinceId,
            zipCode,
            city,
        }, {transaction: t});

        const branchOffice = await BranchOffice.create({
            addressId: address.id,
            establishmentId,
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            msg: 'Sucursal registrada, ok',
            data: branchOffice
        });
    } catch (error) {
        console.log(error);
        await t.rollback();
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador',
        });
    }
}

const updateBrancOffice = async (req, res) => {
    const { id } = req.params;
    let { addressId, ...rest } = req.body;
    try {
            const branchOffice = await BranchOffice.findByPk(id);
            if (!branchOffice){
                return res.status(404).json({
                    msg: `No se encontró la sucursal con el id ${id}`
                });
            }
            await branchOffice.update();

            res.status(200).json({
                msg: 'Sucursal actualizada, ok',
                data: branchOffice
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador'
        });
    }
}

module.exports = {
    getBranchOfficesByEstablishment,
    registerBranchOffice,
    updateBrancOffice
}