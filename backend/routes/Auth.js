const express = require("express");
const Auth = require("../controllers/Auth");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

router.post("/login", Auth.Login);
router.post("/register", Auth.Register);
router.get("/verify", authenticateToken, Auth.verifyUserId);
router.get("/checkverification", authenticateToken, Auth.checkVerified);
router.get("/sendverification", authenticateToken, Auth.sendLink);
router.get("/verifyUser", authenticateToken, Auth.verifyUser);

module.exports = router;
