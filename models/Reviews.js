const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    restaurantName: { type: String, required: true },
    reviewerName: { type: String, required: true },
    ratingDate: { type: Date, required: true },
    reviewHeading: { type: String, required: true },
    reviewText: { type: String, required: true },
    reviewerEat: { type: String, required: true },
    goesWith: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = Reviews = mongoose.model("reviews", reviewsSchema, "reviews");
