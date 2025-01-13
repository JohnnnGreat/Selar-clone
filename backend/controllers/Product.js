const CryptoJS = require("crypto-js");
const Product = require("../models/Product");

const createProduct = (req, res) => {
   console.log(req.user);
   try {
      const productId = generateRandomString();
      const product = new Product({
         productId,
         uploadedBy: req.user.id,
         ...req.body,
      });

      product.save();

      return res.status(201).json({
         message: "Product created successfully",
         product: product,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating product" });
   }
};

module.exports = {
   createProduct,
};

function generateRandomString() {
   const randomBytes = CryptoJS.lib.WordArray.random(3); // 3 bytes will give us 6 hex characters
   return randomBytes.toString(CryptoJS.enc.Hex).slice(0, 6);
}
