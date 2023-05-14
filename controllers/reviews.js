const mongoose = require("mongoose");
const Reviews = require("../models/Reviews");
const fs = require("fs");
const Restaurant = require("../restaurants.json");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getReview = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await Reviews.findById(id);
    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  const { reviewerName, ratingDate, reviewHeading, reviewText } = req.body;
  const restaurantName = req.params.name;

  fs.readFile("restaurants.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    const restaurants = JSON.parse(data);
    const restaurantIndex = restaurants.findIndex(
      (r) => r.name === restaurantName
    );

    if (restaurantIndex === -1) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const newReview = {
      reviewerName,
      ratingDate,
      reviewHeading,
      reviewText,
    };

    restaurants[restaurantIndex].reviews.push(newReview);

    fs.writeFile("restaurants.json", JSON.stringify(restaurants), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }

      res
        .status(201)
        .json({ message: "Review added successfully", review: newReview });
    });
  });
};

exports.updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    let { review, image } = req.body;
    let editImage = req.file?.filename;
    let existingReview = await Reviews.findById(id);
    let editData = {
      review,
    };
    if (editImage) {
      editData = { ...editData, image: editImage };
    } else {
      editData = { ...editData, image: image };
      fs.renameSync(
        "./uploads/reviews/" + existingReview.review,
        "./uploads/reviews/" + review
      );
    }

    const updatedReview = await Reviews.findByIdAndUpdate(id, editData);
    await updatedReview.save();
    res.status(200).send(updatedReview);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    let review = await Reviews.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
