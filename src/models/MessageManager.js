const connection = require("../../db");

async function fetchMessage() {
  const sql = "SELECT * FROM message";
  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

// fetch All Message
async function fetchMessageWhenIsreadIsTrue() {
  const sql = "SELECT * FROM message WHERE isRead = true";

  return connection
    .promise()
    .query(sql, Object.values(data))
    .then(async ([rows]) => {
      bodyResponse = rows.insertId;
      return { status: 201, message: bodyResponse };
    })
    .catch((error) => {
      console.error("Erreur lors de l'exécution de la requête SQL :", error);
      return { status: 500, message: error };
    });
}
// fetch All Message
async function fetchMessageWhenIsreadIsFalse() {
  const sql = "SELECT * FROM message WHERE isRead = false";

  return connection
    .promise()
    .query(sql, Object.values(data))
    .then(async ([rows]) => {
      bodyResponse = rows.insertId;
      return { status: 201, message: bodyResponse };
    })
    .catch((error) => {
      console.error("Erreur lors de l'exécution de la requête SQL :", error);
      return { status: 500, message: error };
    });
}

async function insertMessage(data) {
  const sql =
    "INSERT INTO message (email, subject, content, isRead) VALUES (?,?,?,?)";

  return connection
    .promise()
    .query(sql, Object.values(data))
    .then(async ([rows]) => {
      bodyResponse = rows.insertId;
      return { status: 201, message: bodyResponse };
    })
    .catch((error) => {
      console.error("Erreur lors de l'exécution de la requête SQL :", error);
      return { status: 500, message: error };
    });
}

module.exports = {
  fetchMessage,
  insertMessage,
  fetchMessageWhenIsreadIsTrue,
  fetchMessageWhenIsreadIsFalse,
};
