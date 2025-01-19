const mongoose = require("mongoose");

const IMSSchema = new mongoose.Schema({
   id: { type: Number, required: true },
   type: { type: String, required: true },
   value: { type: String, required: true },
});

const ShowLoveSchema = new mongoose.Schema({
   imageUrl: { type: String, required: true },
   uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
   },
   displayName: { type: String, required: true },
   bio: { type: String, required: true },
   showLoveLink: { type: String, required: true },
   color: { type: String, required: true },
   heading: { type: String, required: true },
   customNote: { type: String, required: true },
   socialMedia: { type: [IMSSchema], required: true },
});

const ShowLove = mongoose.model("ShowLove", ShowLoveSchema);

module.exports = ShowLove;
