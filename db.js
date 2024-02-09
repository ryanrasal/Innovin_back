require("dotenv").config();
const mysql = require("mysql2");
const timeout = 30000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.DB_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  connectTimeout: timeout,
});

console.log(process.env.MYSQL_HOST, process.env.DB_PORT, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, process.env.MYSQL_DB)

module.exports = connection;
