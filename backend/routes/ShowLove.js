const express = require("express");
const Showlove = require("../controllers/Showlove");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

router.post("/create", authenticateToken, Showlove.createShowLove);

module.exports = router;
