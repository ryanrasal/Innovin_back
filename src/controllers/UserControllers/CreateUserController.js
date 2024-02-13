const UserManager = require("../../models/UserManager");

async function createUserController(req, res) {
  const { status, message } = await UserManager.insertUser(req.body);

  return res.json({ status, message });
}

module.exports = createUserController;
