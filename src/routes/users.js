const express = require("express");
const router = express.Router();

const readUserController = require("../controllers/UserControllers/ReadUserController");
const readOneUserController = require("../controllers/UserControllers/ReadOneUserController");
const createUserController = require("../controllers/UserControllers/CreateUserController");
const deleteUserController = require("../controllers/UserControllers/DeleteUserController");
const updateUserController = require("../controllers/UserControllers/UpdateUserController");

const readUsersWithoutRoleAdmin = require("../controllers/UserControllers/ReadUsersWithoutRoleAdmin");

/* fetch all users . */
router.get("/", readUserController);

/* fetch all users without role admin . */
router.get("/notAdmin", readUsersWithoutRoleAdmin);

/* fetch one user . */
router.get("/:id", readOneUserController);

/* Create user . */
router.post("/", createUserController);

/* Update user . */
router.put("/:id", updateUserController);

/* Delete user . */
router.delete("/:id",  deleteUserController);

module.exports = router;
