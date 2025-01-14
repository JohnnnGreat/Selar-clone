const CryptoJS = require("crypto-js");

const createProduct = (req, res) => {
   try {
      const productId = generateRandomString();
      const product = new Product({
         productId,
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

const deleteProduct = (req, res)=>{}

module.exports = {
   createProduct,
};

function generateRandomString() {
   const randomBytes = CryptoJS.lib.WordArray.random(3); // 3 bytes will give us 6 hex characters
   return randomBytes.toString(CryptoJS.enc.Hex).slice(0, 6);
}
