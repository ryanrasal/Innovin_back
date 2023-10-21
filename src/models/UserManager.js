const connection = require("../../db");
const { passwordHasher } = require("../services/PasswordHelper");

// fetch All User
async function fetchUser() {
  const sql = "SELECT * FROM user";

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
// fetch All User WHERE role = role
async function fetchUserWithoutRoleAdmin() {
  const sql = "SELECT * FROM user WHERE role = 'user'";

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

// fetch One User
async function fetchOneUser(id) {
  const sql = `SELECT * FROM user where id = ${id}`;

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      if (rows.length === 0) {
        return { status: 404, message: "Utilisateur non trouvé" };
      }
      return { status: 200, message: rows[0] };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

// Create user and Create him cart
async function insertUser(data) {
  const sql = `INSERT INTO user (firstname, lastname, username, role, email, password, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  data.password = await passwordHasher(data.password);

  let bodyResponse = { ...data };

  return connection
    .promise()
    .query(sql, Object.values(data))
    .then(async ([rows]) => {
      bodyResponse.id = rows.insertId;
      let postCartQuery = `INSERT INTO cart (is_order, user_id) VALUES ('0', ${bodyResponse.id})`;
      return connection
        .promise()
        .query(postCartQuery)
        .then(() => {
          return { status: 201, message: bodyResponse };
        });
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

// Delete User
async function deleteUser(id) {
  let sqlQuery = `DELETE FROM user where id = ${id}`;

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
  fetchUser,
  fetchOneUser,
  insertUser,
  deleteUser,
  fetchUserWithoutRoleAdmin,
};
