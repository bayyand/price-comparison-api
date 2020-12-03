const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const {
    categoryExist
} = require('../helpers/db-validator');

const {
    getCategories,
    registerCategory,
    updateCategory
} = require('../controllers/category');

const router = new Router();

router.get('/', [
    validateJWT
], getCategories);

router.post('/', [
    validateJWT,
    check('categoryName', 'La categoria es obligatoria').not().isEmpty(),
    check('categoryName').custom(categoryExist),
    validateFields
], registerCategory);

router.put('/:id', [
    validateJWT,
    check('categoryName', 'La categoria es obligatoria').not().isEmpty(),
    check('categoryName').custom(categoryExist),
    validateFields
], updateCategory);

module.exports = router;