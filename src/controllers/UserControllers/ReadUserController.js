const UserManager = require("../../models/UserManager");

async function readUserController(_, res) {
  const { status, message } = await UserManager.fetchUser();

  return res.status(status).json(message);
}

module.exports = readUserController;
