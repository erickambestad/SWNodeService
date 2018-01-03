// Summary routes
const express = require("express");
const router = express.Router();

// Summary controller
const SummaryCtrl = require("./controller");

// Routes
router.get("/", SummaryCtrl.getSummaryCallback);

// Export our module
module.exports = router;
