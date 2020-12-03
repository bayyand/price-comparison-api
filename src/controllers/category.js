const Category = require('../models/category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hablar con el administrador'
        })
    }
}

const registerCategory = async (req, res) => {
    const { categoryName, description } = req.body;
    try {
        const category = await Category.create({
            categoryName,
            description,
        });
        res.status(201).json({
            msg: 'Categoria registrada, ok',
            data: category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hablar con el administrador'
        })
    }

}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                msg: `No se encontro una categoria con el id ${id}`
            });
        }
        await category.update(data);

        res.status(200).json({
            msg: 'Categoria actualizada, ok',
            data: category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hablar con el administrador'
        })
    }
}

module.exports = {
    getCategories,
    registerCategory,
    updateCategory
}