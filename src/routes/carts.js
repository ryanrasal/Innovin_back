const express = require("express");

const router = express.Router();

const readCartController = require("../controllers/CartControllers/ReadCartsController");
const readCartOrderController = require("../controllers/CartControllers/ReadCartsOrderController");
const updateCartController = require("../controllers/CartControllers/UpdateCartsController");

/* fetch all cart . */
router.get("/:id", readCartController);
/* fetch all cart . */
router.get("/isOrder/:id", readCartOrderController);
/* update one cart . */
router.put("/:id", updateCartController);

module.exports = router;
