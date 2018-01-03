// API routes
var express = require("express");
var router = express.Router();

// Controllers
var startRoute = require("./start");
var nextRoute = require("./next");
var summaryRoute = require("./summary");

// Routes
router.use("/start", startRoute);
router.use("/next", nextRoute);
router.use("/summary", summaryRoute);

module.exports = router;
