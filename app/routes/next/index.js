// Next routes
const express = require("express");
const router = express.Router();

// Next controller
const NextCtrl = require("./controller");

// Routes
router.post("/:question_id", NextCtrl.postNextCallback);

// Export our module
module.exports = router;
