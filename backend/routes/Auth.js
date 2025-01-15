const express = require("express");
const Auth = require("../controllers/Auth");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

router.post("/login", Auth.Login);
router.post("/register", Auth.Register);
router.get("/verify", authenticateToken, Auth.verifyUserId);

module.exports = router;
