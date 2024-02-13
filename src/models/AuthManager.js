const connection = require("../../db");
const { passwordVerification } = require("../services/PasswordHelper");

async function login(email, password) {
  try {
    const [rows] = await connection.promise().query("SELECT * FROM user WHERE email = ?", [email]);

    if (rows.length === 0 || !(await passwordVerification(password, rows[0].password))) {
      return { status: 401, message: "Email or password is wrong" };
    }

    return {
      status: 200,
      message: { userConnect: rows[0] },
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}

module.exports = {
  login,
};
