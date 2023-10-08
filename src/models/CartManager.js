const connection = require("../../db");

// fetch all carts
async function fetchCarts(userId) {
  const sql = `SELECT c.id, c.user_id, c.is_order, JSON_ARRAYAGG(
    JSON_OBJECT(
        'wine_id', w.id,
        'cart_wine_id', cw.id,
        'name', w.name,
        'price', ROUND(w.price, 2),
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

module.exports = {
  fetchCarts,
};
