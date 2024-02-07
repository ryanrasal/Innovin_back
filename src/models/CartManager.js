const connection = require("../../db");

// fetch all carts
async function fetchCarts(userId) {
  const sql = `SELECT c.id, c.user_id, c.is_order, JSON_ARRAYAGG(
    JSON_OBJECT(
        'wine_id', w.id,
        'cart_wine_id', cw.id,
        'name', w.name,
        'wine_type', w.wine_type,
        'price', ROUND(w.price, 2),
        'total', ROUND(w.price * cw.quantity, 2),
        'image', w.image,
        'origin_country', w.origin_country,
        'quantity', cw.quantity
    )
) AS content FROM cart c
LEFT JOIN cart_wine as cw ON c.id = cw.cart_id
LEFT JOIN wine as w ON cw.wine_id = w.id
WHERE c.user_id = ${userId} && c.is_order = 0
GROUP BY c.id`;

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      return { status: 200, message: rows[0] };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function fetchCartsOrder(userId) {
  const sql = `SELECT c.id, c.user_id, c.is_order, JSON_ARRAYAGG(
    JSON_OBJECT(
        'wine_id', w.id,
        'cart_wine_id', cw.id,
        'name', w.name,
        'wine_type', w.wine_type,
        'price', ROUND(w.price, 2),
        'total', ROUND(w.price * cw.quantity, 2),
        'image', w.image,
        'origin_country', w.origin_country,
        'quantity', cw.quantity
    )
) AS content FROM cart c
LEFT JOIN cart_wine as cw ON c.id = cw.cart_id
LEFT JOIN wine as w ON cw.wine_id = w.id
WHERE c.user_id = ${userId} && c.is_order = 1
GROUP BY c.id`;

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function updateCart(userId) {
  let responseId;
  let wines;

  // Récupère l'ID du panier
  const findIdCart = `SELECT * FROM cart WHERE user_id = ${userId} AND is_order = false LIMIT 1`;
  try {
    const [cartRows] = await connection.promise().query(findIdCart);
    if (cartRows.length > 0) {
      responseId = cartRows[0].id;

      // Récupère tous les vins du panier
      const findCartWines = `SELECT * FROM cart_wine WHERE cart_id = ${responseId}`;
      const [winesRows] = await connection.promise().query(findCartWines);

      if (winesRows.length > 0) {
        wines = winesRows;
        // Met à jour la quantité de chaque vin dans la base de données
        const updatePromises = wines.map((wine) => {
          const updateQuantityWine = `UPDATE wine SET quantity = quantity - ${wine.quantity} WHERE id = ${wine.wine_id}`;
          return connection.promise().query(updateQuantityWine);
        });
        await Promise.all(updatePromises);
        // Mettre à jour la propriété is_order de la première ligne du panier
        const updateSql = `UPDATE cart SET is_order = true WHERE user_id = ${userId} AND is_order = false ORDER BY id ASC LIMIT 1;`;

        await connection.promise().query(updateSql);

        // Effectuer un POST sur la table cart pour créer un nouveau panier
        const insertSql = `INSERT INTO cart (is_order, user_id) VALUES (false , ${userId})`;
        await connection.promise().query(insertSql);
        return { status: 200, message: "Cart updated successfully." };
      }
    }
    return { status: 404, message: "No wines found in the cart." };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}
// UPDATE cart SET is_order = true WHERE user_id = 1 AND is_order = false ORDER BY id ASC LIMIT 1;
module.exports = {
  fetchCarts,
  updateCart,
  fetchCartsOrder,
};
