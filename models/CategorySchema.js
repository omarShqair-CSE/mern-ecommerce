const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
