// Start routes
const express = require("express");
const router = express.Router();

// Start controller
const StartCtrl = require("./controller");

// Routes
router.get("/", StartCtrl.getStartCallback);

// Export our module
module.exports = router;
