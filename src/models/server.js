const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const db = require('../data/connectionToPg');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Database Connection
        this.dbConnection();

        //Path routes
        this.userPath = '/users';
        this.authPath = '/auth';
        this.countriesPath = '/countries';
        this.provincesPath = '/provinces';
        this.typeOfEstablishmentsPath = '/type-of-establishments';
        this.establishmentsPath = '/establishments';
        this.branchOfficesPath = '/branch-offices';
        this.categoriesPath = '/categories';
        this.productsPath = '/products';

        //Meddlewares
        this.middewares();
        //Routes
        this.routes();
    }

    middewares() {
        this.app.use(bodyParser.json());

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Conexion a la base de datos establecida');

        } catch (error) {
            console.log('Error al conectar con la base de datos');
        }
    }

    routes() {
        //Main Routes
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/users'));
        this.app.use(this.countriesPath, require('../routes/country'));
        this.app.use(this.provincesPath, require('../routes/province'));
        this.app.use(this.typeOfEstablishmentsPath, require('../routes/typeOfEstablishment'));
        this.app.use(this.establishmentsPath, require('../routes/establishment'));
        this.app.use(this.branchOfficesPath, require('../routes/branchOffice'));
        this.app.use(this.categoriesPath, require('../routes/category'));
        this.app.use(this.productsPath, require('../routes/product'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('This application in running on port ', this.port);
        });
    }
}

module.exports = Server;