const CartWineManager = require("../../models/CartWineManager");

async function deleteCartWineController(req, res) {
  const { status, message } = await CartWineManager.deletedCartWine(
    req.params.id
  );

  return res.status(status).json(message);
}

module.exports = deleteCartWineController;
