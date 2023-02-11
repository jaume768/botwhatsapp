const mysql = require("mysql2");
const {DB_HOST,DB_PORT,DB_USER,DB_DATABASE,DB_PASSWORD} = require('../config.js')


const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
});

module.exports = connection;