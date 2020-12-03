const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { emailExist,
    phoneExist
} = require('../helpers/db-validator');

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/user');

const router = Router();

router.get('/', [
    validateJWT
], getUsers);
router.get('/:id', [
    validateJWT
], getUserById);
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExist),
    check('phone').custom(phoneExist),
    check('sex', 'El sexo es obligatorio').not().isEmpty(),
    check('password', 'La constraseña debe tener almenos 8 caracteres').isLength({ min: 8 }),
    check('countryId', 'El id del pais es obligatorio').not().isEmpty(),
    check('provinceId', 'El id de la provincia es obligatorio').not().isEmpty(),
    check('city', 'La ciudad es obligatoria').not().isEmpty(),
    validateFields
], createUser);



router.put('/:id', [
    validateJWT
], updateUser);
router.delete('/:id', [
    validateJWT
], deleteUser);


module.exports = router;