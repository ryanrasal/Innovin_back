const CartManager = require("../../models/CartManager");

async function readCartController(req, res) {
  const { status, message } = await CartManager.fetchCarts(req.params.id);

  return res.status(status).json(message);
}

module.exports = readCartController;
