const mongoose = require("mongoose");
const Brands = require("../restaurants.json");
const Reviews = require("../models/Reviews");

exports.getAllBrands = async (req, res, next) => {
  try {
    res.status(200).json(Brands);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
