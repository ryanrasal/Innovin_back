require("dotenv").config();
const mysql = require("mysql2");

const HOST = "172.20.0.2"
const connection = mysql.createConnection({
  host: HOST,
  port: 3308,
  user: "innovin",
  password: "innovin",
  database: "innovin",
});


module.exports = connection;
