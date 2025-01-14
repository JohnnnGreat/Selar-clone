const CryptoJS = require("crypto-js");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
   try {
      const productId = generateRandomString();
      const product = new Product({
         productId,
         uploadedBy: req.user.id,
         ...req.body,
      });

      await product.save();

      return res.status(201).json({
         message: "Product created successfully",
         product: product,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating product" });
   }
};

// const MONGO_URI: string =
//    process.env.MONGO_URI ||
//    "mongodb+srv://johnossai20:wJH8hmNOuFDJAUGX@cluster0.becdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const deleteProduct = (req, res) => {};

const getProductById = async (req, res) => {
   try {
      console.log(req.params);
      const product = await Product.findOne({ productId: req.params.id });

      console.log(product);
      if (!product) {
         return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting product" });
   }
};

module.exports = {
   createProduct,
   getProductById,
};

function generateRandomString() {
   const randomBytes = CryptoJS.lib.WordArray.random(3); // 3 bytes will give us 6 hex characters
   return randomBytes.toString(CryptoJS.enc.Hex).slice(0, 6);
}
