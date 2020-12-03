const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBUSERPASS,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    ssl: true,
    dialect: "postgres",
    //WARNING
    logging: false,
  }
);

module.exports = db;
