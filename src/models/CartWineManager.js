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

async function deletedCartWine(wineId, userId) {
  const sqlFirst = `SELECT * FROM cart WHERE user_id = ${userId} AND is_order = false;`;

  try {
    const [cartRows] = await connection.promise().query(sqlFirst);

    if (cartRows.length === 0) {
      throw new Error("Cart not found for the user.");
    }
    const cartWineId = cartRows[0].id;
    const deleteWine = `DELETE FROM cart_wine WHERE wine_id = ${wineId} AND cart_id = ${cartWineId}`;
    const [deleteResult] = await connection.promise().query(deleteWine);

    if (deleteResult.affectedRows === 0) {
      throw new Error("Wine not found in the cart.");
    }

    return { status: 200, message: "Wine deleted successfully." };
  } catch (error) {
    console.error(error);
    return { status: 500, message: error.message || "Internal Server Error" };
  }
}
module.exports = {
  insertCartWine,
  deletedCartWine,
};
