const MessageManager = require("../../models/MessageManager");

async function readMessageWhenIsreadIsTrue(_, res) {
  const { status, message } = await MessageManager.fetchMessageWhenIsreadIsTrue();

  return res.json({status,message});
}

module.exports = readMessageWhenIsreadIsTrue;