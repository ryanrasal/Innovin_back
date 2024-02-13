const express = require("express");
const router = express.Router();

const logoutController = require("../controllers/LogoutControllers/LogoutController");

/* POST : login a user. */
router.post("/", logoutController);

module.exports = router;
