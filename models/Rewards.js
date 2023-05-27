const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardsSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    voucherNo: { type: String, required: true },
    date: { type: String },
  },
  { timestamps: true }
);

module.exports = Rewards = mongoose.model("rewards", rewardsSchema, "rewards");
