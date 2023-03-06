const mongoose = require("mongoose");
const Reviews = require("../models/Reviews");
const fs = require("fs");

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
  let { review } = req.body;
  const image = req.file?.filename;

  const newReview = new Reviews({
    review,
    image,
  });
  try {
    const savedReview = await Reviews.create(newReview);
    res.status(200).send(savedReview);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
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
