const mongoose = require("mongoose");

const brandsSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Brands = mongoose.model("Brands", brandsSchema);

module.exports = Brands;
