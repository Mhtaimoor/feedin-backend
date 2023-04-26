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
exports.getSingleBrand = async (req, res) => {
  console.log(req.params.name);
  try {
    let name = req.params.name;
    let brand = Brands.find((brand) => brand.name == name);
    res.status(200).json(brand);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
