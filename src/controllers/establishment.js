const Establishment = require('../models/establishment');

const getEstablishments = async (req, res) => {
    try {
        const establishments = await Establishment.findAll();
        res.status(200).json(establishments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const registerEstablishment = async (req, res) => {
    const { establishmentName, typeOfEstablishmentId } = req.body;
    try {
        const establishment = await Establishment.create({
            establishmentName,
            typeOfEstablishmentId,
        });
        res.status(201).json({
            msg: 'Establecimiento registrado, ok',
            data: establishment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const updateEstablishment = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const establishment = await Establishment.findByPk(id);

        if (!establishment) {
            return res.status(404).json({
                msg: `No se encontro un establecimiento con el id ${id}`
            });
        }

        await establishment.update(data);
        res.status(200).json({
            msg: 'Establecimiento actualizado, ok',
            data: establishment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

module.exports = {
    getEstablishments,
    registerEstablishment,
    updateEstablishment
}