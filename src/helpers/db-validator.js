const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');

const emailExist = async (email = '') => {
    const ifExist = await User.findOne({
        where: {
            email
        }
    });
    if (ifExist) {
        throw new Error(`El correo ${email}, ya esta registrado`);
    }
}

const phoneExist = async (phone = '') => {
    const ifExist = await User.findOne({
        where: {
            phone
        }
    });
    if (ifExist) {
        throw new Error(`El telefono ${phone}, ya esta registrado`);
    }
}

const categoryExist = async (categoryName = '') => {
    const ifExist = await Category.findOne({
        where: {
            categoryName
        }
    });
    if (ifExist) {
        throw new Error(`La categoria ${categoryName}, ya esta registrada`);
    }
}

const productExist = async (barCode = '') => {
    const ifExist = await Product.findOne({
        where: {
            barCode,
        }
    });
    if (ifExist) {
        throw new Error(`El producto con un codigo de barra ${barCode} ya esta registrado`);
    }
}

module.exports = {
    emailExist,
    phoneExist,
    categoryExist,
    productExist
}