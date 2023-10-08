const connection = require("../../db");

// Ajouter un vin au panier
async function insertCartWine(data, res) {
  try {
    // Recherche si le vin existe déjà dans le panier
    const [existingWine] = await connection
      .promise()
      .query(
        "SELECT id, quantity FROM cart_wine WHERE wine_id = ? AND cart_id = ?",
        [data.wine_id, data.cart_id]
      );
    if (existingWine.length > 0) {
      // Si le vin existe déjà dans le panier, augmente la quantité du vin
      const { id, quantity } = existingWine[0];
      await connection
        .promise()
        .query("UPDATE cart_wine SET quantity = ? WHERE id = ?", [
          quantity + data.quantity,
          id,
        ]);
    } else {
      // Si le vin n'existe pas dans le panier, il est ajouté
      await connection
        .promise()
        .query(
          "INSERT INTO cart_wine (wine_id, quantity, cart_id) VALUES (?, ?, ?)",
          [data.wine_id, parseInt(data.quantity, 10), data.cart_id]
        );
    }
    res.status(201).json({ message: "Vin ajouté au panier avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier :", error);
    res
      .status(500)
      .json({ error: "Une erreur s'est produite lors de l'ajout au panier" });
  }
}

async function deletedCartWine(id) {
  const sql = `DELETE FROM cart_wine WHERE id = ${id}`;

  return connection
    .promise()
    .query(sql)
    .then(async () => {
      return { status: 200, message: {} };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

module.exports = {
  insertCartWine,
  deletedCartWine,
};
