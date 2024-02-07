const express = require("express");

const router = express.Router();

const createCartWineController = require("../controllers/CartWineControllers/CreateCartWineController");
const deleteCartWineController = require("../controllers/CartWineControllers/DeleteCartWineController");

/* post cart . */
router.post("/", createCartWineController);

/* delete cart . */
router.delete("/:id", deleteCartWineController);

module.exports = router;
