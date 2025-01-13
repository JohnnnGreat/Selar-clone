const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
   {
      productId: {
         type: String,
         required: true,
         unique: true,
      },
      uploadedBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Auth",
         required: true,
      },
      imageUrl: {
         type: String,
         required: true,
      },
      title: {
         type: String,
      },
      salePrice: {
         type: String,
      },
      originalPrice: {
         type: String,
      },
      description: {
         type: String,
      },
      category: {
         type: String,
      },
      subCategory: {
         type: String,
      },
      productType: {
         type: String,
      },
      quantity: {
         type: Number,
      },
      preorderDate: {
         type: Date,
      },
      redirectUrl: {
         type: String,
      },
      ctaButton: {
         type: String,
      },
      hideProduct: {
         type: Boolean,

         default: false,
      },
      preOrderProduct: {
         type: Boolean,

         default: false,
      },
      strikePrice: {
         type: Boolean,

         default: false,
      },
   },
   {
      timestamps: true,
   },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
