const WineManager = require("../../models/WineManager");

async function createWineController(req, res) {
  const dataWine = req.body;

  const { renamedFile } = req;

  dataWine.image = renamedFile;

  dataWine.year = parseInt(dataWine.year, 10);

  dataWine.price = parseInt(dataWine.price, 10);

  const { status, message } = await WineManager.createWine(dataWine);

  return res.status(status).json(message);
}

module.exports = createWineController;
