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
  const sql = `INSERT INTO wine (name, year, wine_type, origin_country, region, description, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const wineData = JSON.parse(data.wine);
  const imageFilename = data.image;

  const valuesWine = [
    wineData.name,
    wineData.year,
    wineData.wine_type,
    wineData.origin_country,
    wineData.region,
    wineData.description,
    wineData.price,
    wineData.quantity,
    imageFilename,
  ];

  return connection
    .promise()
    .query(sql, valuesWine)
    .then(async ([rows]) => ({
      status: 201,
      message: { ...data, id: rows.insertId },
    }))
    .catch((error) => ({ status: 500, message: error }));
}


// update wine
async function updateWine(id, data) {
  const sql = `
    UPDATE wine SET name = ?, year = ?, wine_type = ?, origin_country = ?, region = ?,
      description = ?, price = ?, quantity = ?, image = ? WHERE id = ? `;

  const values = [...Object.values(data), id];

  return connection
    .promise()
    .query(sql, values)
    .then(() => {
      return { status: 200, message: "Wine updated successfully" };
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
  updateWine,
  deleteWine,
};
