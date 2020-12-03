const Country = require('../models/country');

const getCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.status(200).json(countries);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const registerCountry = async (req, res) => {
    const { countryName } = req.body;
    try {
        const country = await Country.create({
            countryName,
        });

        res.status(201).json({
            msg: 'Páis agregado, ok',
            data: country,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const updateCountry = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const country = await Country.findByPk(id);

        if (!country) {
            return res.status(404).json({
                msg: `No se encontro el páis con el id ${id}`
            });
        }
        await country.update(data);

        res.status(200).json({
            msg: 'Páis actualizado, ok',
            data: country
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}


module.exports = {
    getCountries,
    registerCountry,
    updateCountry
}