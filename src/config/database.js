const mysql = require('mysql');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const connection = mysql.createConnection({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
});

module.exports = connection;
