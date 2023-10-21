const UserManager = require("../../models/UserManager");

async function readUsersWithoutRoleAdmin(_, res) {
  const { status, message } = await UserManager.fetchUserWithoutRoleAdmin();

  return res.status(status).json(message);
}

module.exports = readUsersWithoutRoleAdmin;
