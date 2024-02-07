const UserManager = require("../../models/UserManager");

async function updateUserController(req, res) {
  const { status, message } = await UserManager.updateUser(
    req.params.id,
    req.body
  );

  return res.json({ status, message });
}

module.exports = updateUserController;
