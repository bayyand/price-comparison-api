const jwt = require('jsonwebtoken');

const jwtGenerate = (uid = '') => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.RPRIVATEKEY, {
            expiresIn: '90d'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }
        });
    });
}


module.exports = {
    jwtGenerate
}