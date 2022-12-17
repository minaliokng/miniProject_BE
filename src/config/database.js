const mysql = require('mysql');
const logger = require('./logger');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const connection = mysql.createConnection({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
});

connection.query('USE mini_project_be', (err) => {
  if (err) logger.error(err);
});

module.exports = connection;
