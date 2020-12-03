const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const {
    registerBranchOffice,
    updateBrancOffice
} = require('../controllers/branchOffice');

const router = new Router();

router.post('/', [
    validateJWT,
    check('countryId', 'El id del páis es obligatorio').not().isEmpty(),
    check('provinceId', 'El id de la provincia es obligatorio').not().isEmpty(),
    check('city', 'La ciudad es obligatorio').not().isEmpty(),
    check('establishmentId', 'El id de establecimiento es obligatorio').not().isEmpty(),
    validateFields
], registerBranchOffice);

router.put('/:id', [
    validateJWT
], updateBrancOffice);

module.exports = router;

