const mongoose = require("mongoose");

const MONGO_LOCAL_URI =
  "mongodb+srv://johnossai20:wJH8hmNOuFDJAUGX@cluster0.becdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDatabase = () => {
  mongoose
    .connect(MONGO_LOCAL_URI)
    .then(() => console.log("Database connection established"))
    .catch((err) => console.log("Error Establishing Database Connection", err));
};

module.exports = connectDatabase;
