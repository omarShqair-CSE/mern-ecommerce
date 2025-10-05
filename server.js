const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/books", require("./routes/books"));
app.use("/category", require("./routes/category"));
app.use("images", express.static("images"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
