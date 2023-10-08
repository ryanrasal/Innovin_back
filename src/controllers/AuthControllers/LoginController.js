const AuthManager = require("../../models/AuthManager");

async function loginController(req, res) {
  const { status, message } = await AuthManager.login({
    email: req.body.email,
    password: req.body.password,
  });
  return res.status(status).json(message);
}

module.exports = loginController;
