const mongoose = require("mongoose");
const Brands = require("../models/Brands");
const Reviews = require("../models/Reviews");

exports.getAllBrands = async function (req, res, next) {
  try {
    const brands = await Brands.find();

    res.status(200).json(brands);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
