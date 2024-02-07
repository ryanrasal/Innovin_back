const MessageManager = require("../../models/MessageManager");

async function createMessageController(req, res) {
  const { status, message } = await MessageManager.insertMessage(req.body);

  return res.json({status,message});
}

module.exports = createMessageController;
