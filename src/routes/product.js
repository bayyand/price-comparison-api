const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFileToUpload, validateExtensionFile } = require('../middlewares/validate-file');
const { validateFields } = require('../middlewares/validate-fields');
const { productExist } = require('../helpers/db-validator');

const {
    getProducts,
    getProductsById,
    getProductPricesByBarcode,
    registerProduct,
    registerProductPrice,
    updateProduct
} = require('../controllers/product');

const router = new Router();

router.get('/', [
    validateJWT
], getProducts);

router.get('/:id', [
    validateJWT
], getProductsById);

router.post('/prices/branch-offices', [
    validateJWT,
    check('barCode', 'El codigo de barra es obligatorio').not().isEmpty(),
    validateFields
], getProductPricesByBarcode)

router.post('/', [
    validateJWT,
    check('barCode', 'El codigo de barra es obligatorio').not().isEmpty(),
    check('barCode').custom(productExist),
    check('productName', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('categoryId', 'La categoria del producto es obligatorio').not().isEmpty(),
    validateFileToUpload,
    validateExtensionFile,
    validateFields
], registerProduct);

router.post('/register/price', [
    validateJWT,
    check('productId', 'El id de producto es obligatorio').not().isEmpty(),
    check('branchOfficeId', 'El id de la sucursal es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    validateFields
], registerProductPrice);

module.exports = router;