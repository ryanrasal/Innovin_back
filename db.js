require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.DB_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

console.log(MYSQL_HOST, DB_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB)

module.exports = connection;
