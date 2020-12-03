const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const {
    provinceExist
} = require('../helpers/db-validator');

const {
    getProvinces,
    registerProvince,
    updateProvince
} = require('../controllers/province');

const router = new Router();

router.get('/', [
    validateJWT
], getProvinces);

router.post('/', [
    validateJWT,
    check('provinceName', 'La provincia el obligatoria').not().isEmpty(),
    check('countryId', 'El id del páis es obligatorio').not().isEmpty(),
    validateFields
], registerProvince);

router.put('/:id', [
    validateJWT,
    check('provinceName', 'La provincia el obligatoria').not().isEmpty(),
    validateFields
], updateProvince);

module.exports = router;