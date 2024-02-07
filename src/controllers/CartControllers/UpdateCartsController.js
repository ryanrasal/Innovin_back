const CartManager = require("../../models/CartManager");

async function updateCartController(req, res) {
  const { status, message } = await CartManager.updateCart(req.params.id);

  return res.status(status).json(message);
}

module.exports = updateCartController;