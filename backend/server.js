const express = require("express");
const connectDatabase = require("./lib/database");
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const dotenv = require("dotenv").config();

const cors = require("cors");

const PORT = process.env.PORT || 4040;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/authorization/", authRoutes);
app.use("/api/v1/products/", productRoutes);

app.listen(PORT, async () => {
   await connectDatabase();
   console.log(`Server is running on port ${PORT}`);
});
