const TypeOfEstablishment = require('../models/typeOfEstablishment');

const getTypeOfEstablishments = async (req, res) => {
    try {
        const typeOfEstablishments = await TypeOfEstablishment.findAll();
        res.status(200).json(typeOfEstablishments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const registerTypeOfEstablishment = async (req, res) => {
    const { typeOfEstablishmentName } = req.body;

    try {
        const typeOfEstablishment = await TypeOfEstablishment.create({
            typeOfEstablishmentName,
        });
        res.status(201).json({
            msg: 'Tipo de establecimiento registrado, ok',
            data: typeOfEstablishment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const updateTypeOfEstablishment = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const typeOfEstablishment = await TypeOfEstablishment.findByPk(id);

        if (!typeOfEstablishment) {
            return res.status(404).json({
                msg: `No se encontro un tipo de establecimiento con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

module.exports = {
    getTypeOfEstablishments,
    registerTypeOfEstablishment,
    updateTypeOfEstablishment
}