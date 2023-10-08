const connection = require("../../db");
const { passwordVerification } = require("../services/PasswordHelper");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("jwtRS256.key");

async function login({ email, password }) {
  let userConnect = [];
  return connection
    .promise()
    .query("SELECT * FROM user WHERE email = ?", [email])
    .then(async ([rows]) => {
      if (
        rows.length === 0 ||
        !(await passwordVerification(password, rows[0].password))
      ) {
        return { status: 401, message: "Email or password is wrong" };
      }
      const token = jwt.sign({ userId: rows[0].id }, privateKey, {
        algorithm: "RS256",
      });

      userConnect = [rows[0]];
      return {
        status: 200,
        message: { token: token, userConnect: userConnect[0] },
      };
    });
}

module.exports = {
  login,
};
