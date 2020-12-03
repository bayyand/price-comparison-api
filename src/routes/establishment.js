const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const {
    getEstablishments,
    registerEstablishment,
    updateEstablishment
} = require('../controllers/establishment');
const { 
    getBranchOfficesByEstablishment
} = require('../controllers/branchOffice');

const router = new Router();

router.get('/', [
    validateJWT
], getEstablishments);

router.get('/:establishmentId/branch-offices/', [
    validateJWT,
], getBranchOfficesByEstablishment);

router.post('/', [
    validateJWT,
    check('establishmentName', 'El nombre del establecimiento es obligatorio').not().isEmpty(),
    check('typeOfEstablishmentId', 'El id de tipo de establecimiento es obligatorio').not().isEmpty(),
    validateFields
], registerEstablishment);

router.put('/:id', [
    validateJWT
], updateEstablishment);

module.exports = router;