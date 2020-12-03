
const validateFileToUpload = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: 'El file es obligatorio, contiene una imagen del producto'
        });
    }

    next();
}

const validateExtensionFile = (req, res, next) => {
    validExtension = ['png', 'jpg', 'jpeg', 'gif'];
    const { file } = req.files;
    const { name } = file;
    const shortName = file.name.split('.');
    const extension = shortName[shortName.length - 1];

    //Validar la extension de las fotos
    if (!validExtension.includes(extension)) {
        return res.status(400).json({
            msg: `La extensión del archivo ${extension} no es permitida - ${validExtension}`
        });
    }

    next();
}

module.exports = {
    validateFileToUpload,
    validateExtensionFile
}