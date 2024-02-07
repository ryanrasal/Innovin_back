const WineManager = require("../../models/WineManager");

async function updateWineController(req, res) {
  const { id } = req.params;
  const dataWine = req.body;

  const { status, message } = await WineManager.updateWine(id, dataWine);

  return res.json({ status, message });
}

module.exports = updateWineController;
