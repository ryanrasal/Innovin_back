const express = require("express");

const router = express.Router();

const readCartController = require("../controllers/CartControllers/ReadCartsController");

/* fetch all cart . */
router.get("/:id", readCartController);


module.exports = router;
