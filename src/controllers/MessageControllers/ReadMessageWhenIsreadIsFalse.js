const MessageManager = require("../../models/MessageManager");

async function readMessageWhenIsreadIsFalse(_, res) {
  const { status, message } =
    await MessageManager.fetchMessageWhenIsreadIsFalse();

  return res.json({ status, message });
}

module.exports = readMessageWhenIsreadIsFalse;
