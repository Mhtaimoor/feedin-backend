const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.requireSignin = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (!data) return res.status(401).json({ error: "Token is not valid" });
    req.token = data;
    next();
  } catch {
    res.status(401).json({ error: "Token is not valid" });
  }
};
