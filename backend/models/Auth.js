const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },

   email: {
      type: String,
      required: true,
      unique: true,
   },
   accountSet: {
      type: Boolean,
      default: false,
   },

   plan: {
      type: String,
      enum: ["basic", "standard", "premium"],
      required: true,
      default: "basic",
   },
   accountInformation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AccountInformation",
   },
   password: {
      type: String,
      required: true,
   },
});

module.exports = Auth = mongoose.models.Auth || mongoose.model("Auth", AuthSchema);
