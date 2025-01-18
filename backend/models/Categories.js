const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
   title: string,
   description: string,
});

const Category = mongoose.model("Category", categorySchema);
