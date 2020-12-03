const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const {
    getTypeOfEstablishments,
    registerTypeOfEstablishment,
    updateTypeOfEstablishment
} = require('../controllers/typeOfEstablishment');

const router = new Router();

router.get('/', [
   validateJWT
], getTypeOfEstablishments);

router.post('/', [
    validateJWT,
    check('typeOfEstablishmentName', 'El tipo de establecimiento es obligatorio').not().isEmpty(),
    validateFields
], registerTypeOfEstablishment);

router.put('/:id', [
    validateJWT,
    check('typeOfEstablishmentName', 'El tipo de establecimiento es obligatorio').not().isEmpty(),
    validateFields
], updateTypeOfEstablishment);

module.exports = router;