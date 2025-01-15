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
const deleteProduct = async (req, res) => {
   try {
      const { id } = req.params.id;
      const deleteProduct = await Product.findOneAndDelete({ productId: id });

      return res.status(200).json({
         message: "Product Deleted Successfully",
      });
   } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
   }
};

const updateProduct = async (req, res) => {
   try {
      const { id } = req.params.id;

      const updateProduct = await Product.findOneAndUpdate(req.body, { new: true });

      return res.status(200).json({
         success: true,
         message: "Updated Successfully",
      });
   } catch (error) {
      res.status(500).json({ message: "Error updating product" });
   }
};

const getProductById = async (req, res) => {
   try {
      console.log("user", req.user);
      const product = await Product.findOne({ productId: req.params.id });

      if (!product) {
         return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting product" });
   }
};

const getUserProducts = async (req, res) => {
   try {
      const userId = req.user.id;

      const products = await Product.find({ uploadedBy: userId });

      return res.status(200).json(products);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error Getting User Products" });
   }
};

const getProductsByFilter = async (req, res) => {
   try {
      const { productName, category, productType } = req.query;

      
      const queryObj = {};

      if (productName) {
         queryObj.title = { $regex: productName, $options: 'i' }; // Case-insensitive search
      }

      if (category) {
         queryObj.category = Array.isArray(category) ? { $in: category } : category;
      }

      if (productType) {
         queryObj.productType = Array.isArray(productType) ? { $in: productType } : productType;
      }

      const query = Product.find(queryObj);
      
      const products = await query.exec();

      // Send response
      res.status(200).json({
         success: true,
         count: products.length,
         data: products
      });

   } catch (error) {
      console.error(error);
      res.status(500).json({ 
         success: false,
         message: "Error getting products by filter" 
      });
   }
};

module.exports = {
   createProduct,
   getProductById,
   updateProduct,
   deleteProduct,
   getUserProducts,
   getProductsByFilter,
};

function generateRandomString() {
   const randomBytes = CryptoJS.lib.WordArray.random(3); // 3 bytes will give us 6 hex characters
   return randomBytes.toString(CryptoJS.enc.Hex).slice(0, 6);
}
