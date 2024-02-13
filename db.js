require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DB,
});

// Ajout du message de connexion réussie à la console
connection.getConnection((err, conn) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connexion à la base de données réussie !");
  conn.release();
});

module.exports = connection;
