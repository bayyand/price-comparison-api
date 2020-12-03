const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getCountries,
    registerCountry,
    updateCountry
} = require('../controllers/country');
const {
    getProvincesByCountry
} = require('../controllers/province');

const router = new Router();

router.get('/', [
    validateJWT
], getCountries);

router.get('/:countryId/provinces/', [
    validateJWT
], getProvincesByCountry);

router.post('/', [
    validateJWT,
    check('countryName', 'El páis es obligatorio').not().isEmpty(),
    validateFields
], registerCountry);

router.put('/:id', [
    validateJWT,
    check('countryName', 'El pais es obligatorio').not().isEmpty(),
    validateFields
], updateCountry);

module.exports = router;