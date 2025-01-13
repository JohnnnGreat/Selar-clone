const { default: mongoose } = require("mongoose");

const AccountInformationSchema = mongoose.Schema({
   accountName: {
      type: String,
      required: true,
   },

   accountNumber: {
      type: String,
      required: true,
   },
   country: {
      type: String,
      required: true,
   },
});

const AccountInformation = mongoose.model("AccountInformation", AccountInformationSchema);
module.exports = AccountInformation;
