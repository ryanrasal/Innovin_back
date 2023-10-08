const WineManager = require("../../models/WineManager");

async function readWinesController(_, res) {
  const { status, message } = await WineManager.fetchWines();

  return res.status(status).json(message);
}

module.exports = readWinesController;
