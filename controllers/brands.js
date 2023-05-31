const Brands = require("../restaurants.json");
const fs = require("fs");

exports.getAllBrands = async (req, res, next) => {
  try {
    res.status(200).json(Brands);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.getSingleBrand = async (req, res) => {
  // console.log(req.params.name);
  try {
    let name = req.params.name;
    let brand = Brands.find((brand) => brand.name == name);
    res.status(200).json(brand);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.addBrand = async (req, res) => {
  const { newBrandName, image, rating, address, cuisines } = req.body;
  console.log(req.body);

  try {
    // Check if the brand already exists
    const existingBrand = Brands.find((brand) => brand.name === newBrandName);
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    // Create the new brand object
    const newBrand = {
      name: newBrandName,
      image,
      rating,
      address,
      cuisines,
    };

    // Add the new brand to the restaurant data
    Brands.push(newBrand);

    // Write the updated restaurant data to the JSON file
    fs.writeFile("restaurants.json", JSON.stringify(Brands), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }

      res
        .status(201)
        .json({ message: "Brand added successfully", brand: newBrand });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
