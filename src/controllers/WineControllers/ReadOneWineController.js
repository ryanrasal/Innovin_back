const WineManager = require("../../models/WineManager");

async function readOneWineController(req, res) {
  const { status, message } = await WineManager.fetchOneWine(req.params.id);

  return res.status(status).json(message);
}

module.exports = readOneWineController;
