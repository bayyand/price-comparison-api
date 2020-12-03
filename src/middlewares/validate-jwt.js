const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    const token = req.header('z-token');

    if (!token) {
        return res.status(404).json({
            msg: 'Not Found - 404'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.RPRIVATEKEY);

        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'Not Found - 404'
        });
    }

}


module.exports = {
    validateJWT
}