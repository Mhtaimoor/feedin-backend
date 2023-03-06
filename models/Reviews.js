const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    brandsId: { type: mongoose.Types.ObjectId, required: true, ref: "brands" },
    review: { type: String, required: true },
    image: {type: String}
  },
  { timestamps: true }
);

module.exports = Reviews = mongoose.model("reviews", reviewsSchema, "reviews");
