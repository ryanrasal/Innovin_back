const CartWineManager = require("../../models/CartWineManager");

async function createCartWineController(req, res) {
  console.warn("coucou toi 1")
  try {
    await CartWineManager.insertCartWine(req.body, res);
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier :", error);
    res
      .status(500)
      .json({ error: "Une erreur s'est produite lors de l'ajout au panier" });
  }
}

module.exports = createCartWineController;
