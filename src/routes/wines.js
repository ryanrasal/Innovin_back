const express = require("express");

const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "public/uploads/" });

const fileControllers = require("../controllers/fileController");

const readWinesController = require("../controllers/WineControllers/ReadWinesController");

const readOneWineController = require("../controllers/WineControllers/ReadOneWineController");

const createWineController = require("../controllers/WineControllers/CreateWineController");

const deleteOneWineController = require("../controllers/WineControllers/DeleteWineController");

const updateWineController = require("../controllers/WineControllers/UpdateWineController");

/* fetch all wines . */
router.get("/", readWinesController);

/* fetch one wine . */
router.get("/:id", readOneWineController);

/* DELETE one wine . */
router.delete("/:id", deleteOneWineController);

/* Put one Wine. */
router.put("/:id", updateWineController);

/* Create Wine . */
router.post(
  "/",
  upload.single("picture"),
  fileControllers.fileRename,
  createWineController
);

module.exports = router;
