const WineManager = require("../../models/WineManager");

async function deleteOneWineController(req, res) {
  const { status, message } = await WineManager.deleteWine(req.params.id);

  return res.status(status).json(message);
}

module.exports = deleteOneWineController;
