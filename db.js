require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "innovin",
  password: "innovin",
  database: "innovin",
});


module.exports = connection;
