const CartWineManager = require("../../models/CartWineManager");

async function deleteCartWineController(req, res) {
  const  userId  = req.body.userId
  const { status, message } = await CartWineManager.deletedCartWine(
    req.params.id, userId
  );

  return res.status(status).json(message);
}

module.exports = deleteCartWineController;
