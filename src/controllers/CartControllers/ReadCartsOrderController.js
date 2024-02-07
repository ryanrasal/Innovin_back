const CartManager = require("../../models/CartManager");

async function readCartOrderController(req, res) {
  const { status, message } = await CartManager.fetchCartsOrder(req.params.id);

  return res.status(status).json(message);
}

module.exports = readCartOrderController;
