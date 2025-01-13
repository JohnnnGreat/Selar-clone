const express = require("express");
const Auth = require("../controllers/Auth");

const router = express.Router();

router.post("/login", Auth.Login);
router.post("/register", Auth.Register);

module.exports = router;
