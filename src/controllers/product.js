const { sequelize } = require('../models/image');
const { Op } = require('sequelize');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Product = require('../models/product');
const Image = require("../models/image");
const PricesProductsBranchOffice = require('../models/pricesProductsBranchOffice');
const BranchOffice = require('../models/branchOffice');
const Establishment = require('../models/establishment');
const Address = require('../models/address');

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findByPk(id);
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const getProductPricesByBarcode = async (req, res) => {
    const { barCode } = req.body;

    try {
        const product = await Product.findOne({
            where: {
                barCode,
            }
        });
        if (!product) {
            return res.status(404).json({
                msg: `No se encontro un producto con el código de barra ${barCode}`
            });
        }
        const image = await Image.findOne({
            where: {
                productId: product.id
            }
        });
        const branchOfficesWithPrice = await BranchOffice.findAll({
            order: [
                [{ model: PricesProductsBranchOffice }, 'price', 'ASC']
            ],
            where: {
                '$PricesProductsBranchOffices.productId$': product.id
            },
            include: [Establishment, Address, PricesProductsBranchOffice]
        });
        const branchOffices = await BranchOffice.findAll({
            include: [Establishment, Address]
        });
        res.status(200).json({
            product: {
                id: product.id,
                barCode: product.barCode,
                productName: product.productName,
                img: image.url
            },
            branchOfficesWithPrice: branchOfficesWithPrice,
            branchOffices: branchOffices
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const registerProduct = async (req, res) => {
    const { barCode, productName, categoryId } = req.body;

    const t = await sequelize.transaction();
    try {
        //Upload image
        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        const product = await Product.create({
            barCode,
            productName,
            categoryId
        }, { transaction: t });

        const image = await Image.create({
            url: secure_url,
            productId: product.id
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            msg: 'Producto registrado, ok',
            data: {
                id: product.id,
                barCode: product.barCode,
                categoryId: product.categoryId,
                image: {
                    url: image.url
                }
            }
        });
    } catch (error) {
        console.log(error);
        await t.rollback();
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

const registerProductPrice = async (req, res) => {
    const { productId, branchOfficeId, price } = req.body;

    try {
        const productPrice = await PricesProductsBranchOffice.findOne({
            where: {
                [Op.and]: [{ productId: productId }, { branchOfficeId: branchOfficeId }]
            }
        });
        if (productPrice) {
            productPrice.update({ price, });
            return res.status(200).json({
                msg: 'Precio actualizado, ok'
            });
        }
        const pricesProductsBranchOffice = await PricesProductsBranchOffice.create({
            productId,
            branchOfficeId,
            price,
        });
        res.status(201).json({
            msg: 'Precio registrado, ok'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor comunicarse con el administrador encargado'
        });
    }
}

module.exports = {
    getProducts,
    getProductsById,
    getProductPricesByBarcode,
    registerProduct,
    registerProductPrice,
}