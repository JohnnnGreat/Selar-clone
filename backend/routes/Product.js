const express = require("express");
const Product = require("../controllers/Product");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

router.post("/create", authenticateToken, Product.createProduct);
router.get("/:id", Product.getProductById);

module.exports = router;
