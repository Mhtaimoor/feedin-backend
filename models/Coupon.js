const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  coupon: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = Coupon = mongoose.model("coupon", couponSchema, "coupon");
