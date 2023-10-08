const express = require("express");
const router = express.Router();

const readUserController = require("../controllers/UserControllers/ReadUserController");
const readOneUserController = require("../controllers/UserControllers/ReadOneUserController");
const createUserController = require("../controllers/UserControllers/CreateUserController");
const deleteUserController = require("../controllers/UserControllers/DeleteUserController");

/* fetch all users . */
router.get("/", readUserController);

/* fetch one user . */
router.get("/:id", readOneUserController);

/* Create user . */
router.post("/", createUserController);

/* Create user . */
router.delete("/:id", deleteUserController);

module.exports = router;
