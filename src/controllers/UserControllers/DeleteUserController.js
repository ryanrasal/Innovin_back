const UserManager = require("../../models/UserManager");

async function deleteUserController(req, res) {
  const { status, message } = await UserManager.deleteUser(req.params.id);

  return res.status(status).json(message);
}

module.exports = deleteUserController;
