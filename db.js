require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.DB_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

console.log(
  "host:",
  process.env.MYSQL_HOST,
  "port:",
  process.env.DB_PORT,
  "user:",
  process.env.MYSQL_USER,
  "password:",
  process.env.MYSQL_PASSWORD,
  "database:",
  process.env.MYSQL_DB
);

module.exports = connection;
