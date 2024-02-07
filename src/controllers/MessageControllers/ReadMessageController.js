const MessageManager = require("../../models/MessageManager");

async function readMessageController(_, res) {
  const { status, message } = await MessageManager.fetchMessage();

  return res.status(status).json(message);
}

module.exports = readMessageController;
