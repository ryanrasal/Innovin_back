const express = require("express");
const router = express.Router();

const readMessageController = require("../controllers/MessageControllers/ReadMessageController");
const readMessageWhenIsreadIsTrue = require("../controllers/MessageControllers/ReadMessageWhenIsreadIsTrue");
const readMessageWhenIsreadIsFalse = require("../controllers/MessageControllers/ReadMessageWhenIsreadIsFalse");
const createMessageController = require("../controllers/MessageControllers/CreateMessageController");

/* fetch all messages . */
router.get("/", readMessageController);

/* fetch all messages isRead is true . */
router.get("/isReadIsTrue", readMessageWhenIsreadIsTrue);

/* fetch all messages isRead is true . */
router.get("/isReadIsFalse", readMessageWhenIsreadIsFalse);

/* Create user . */
router.post("/", createMessageController);

module.exports = router;
