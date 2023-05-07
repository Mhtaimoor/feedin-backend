const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: {
    type: String,
  },
});

module.exports = User = mongoose.model("users", userSchema, "users");
