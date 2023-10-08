const express = require("express");

const router = express.Router();

const createCartWineController = require("../controllers/CartWineControllers/CreateCartWineController");
const deleteCartWineController = require("../controllers/CartWineControllers/DeleteCartWineController");

/* fetch all cart . */
router.post("/", createCartWineController);

/* fetch all cart . */
router.delete("/:id", deleteCartWineController);

module.exports = router;
