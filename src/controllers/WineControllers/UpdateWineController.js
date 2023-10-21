const WineManager = require("../../models/WineManager");

async function updateWineController(req, res) {
  const { id } = req.params;
  const dataWine = req.body;

  const { status, message } = await WineManager.updateWine(id, dataWine);

  return res.status(status).json(message);
}

module.exports = updateWineController;
