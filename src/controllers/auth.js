const bcryptjs = require("bcryptjs");

const User = require('../models/user');
const { jwtGenerate } = require("../helpers/jwt-generator");

const login = async (req, res) => {

    let { email, password } = req.body;

    try {

        //Se verificar si el email  existe
        const user = await User.findOne({
            where: {
                email,
            }
        });
        if (!user) {
            return res.status(400).json({
                msg: 'Correo o contraseña incorrectos'
            });
        }

        //Se verifica la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Correo o contraseña incorrectos'
            });
        }

        //Se genera el json web tokens
        const token = await jwtGenerate(user.id);

        res.json({
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hablar con el administrador'
        })
    }
}

module.exports = {
    login
}