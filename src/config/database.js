const mysql = require('mysql2');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const database = mysql.createPoolPromise({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
});

module.exports = database;
