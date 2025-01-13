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
         required: false,
      },
      salePrice: {
         type: String,
         required: true,
      },
      originalPrice: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      subCategory: {
         type: String,
         required: true,
      },
      productType: {
         type: String,
         required: true,
      },
      quantity: {
         type: Number,
         required: true,
      },
      preorderDate: {
         type: Date,
         required: true,
      },
      redirectUrl: {
         type: String,
         required: true,
      },
      ctaButton: {
         type: String,
         required: true,
      },
      hideProduct: {
         type: Boolean,
         required: true,
         default: false,
      },
      preOrderProduct: {
         type: Boolean,
         required: true,
         default: false,
      },
      strikePrice: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
