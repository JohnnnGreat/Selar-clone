const mongoose = require("mongoose");

const MONGO_LOCAL_URI = "mongodb://0.0.0.0:27017/selar";

const connectDatabase = () => {
   mongoose
      .connect(MONGO_LOCAL_URI)
      .then(() => console.log("Database connection established"))
      .catch((err) => console.log("Error Establishing Database Connection", err));
};

module.exports = connectDatabase;
