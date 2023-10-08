const connection = require("../../db");

// fetch All wine
async function fetchWines() {
  const sql = "SELECT * FROM wine";

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
// fetch One Wine
async function fetchOneWine(id) {
  const sql = `SELECT * FROM wine WHERE id = ${id}`;

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      return { status: 200, message: rows[0] };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

// Create Wine
async function createWine(data) {
  const sql = `INSERT INTO wine (name, year, wine_type, origin_country, region, grape_variety, description, price, best_seller, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let bodyResponse = { ...data };

  return connection
    .promise()
    .query(sql, Object.values(data))
    .then(async ([rows]) => {
      bodyResponse.id = rows.insertId;
      return { status: 201, message: bodyResponse };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

// Delete Wine
async function deleteWine(id) {
  let sqlQuery = `DELETE FROM wine where id = ${id}`;

  return connection
    .promise()
    .query(sqlQuery)
    .then(async () => {
      return { status: 200, message: {} };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

module.exports = {
  fetchWines,
  createWine,
  fetchOneWine,
  deleteWine,
};
