const mongoose = require("mongoose");
const Review = require("../models/Reviews");
const Reward = require("../models/Rewards");
const fs = require("fs");
const Restaurant = require("../restaurants.json");

function generateRandomNumber() {
  const min = 100000; // Minimum 6-digit number (inclusive)
  const max = 999999; // Maximum 6-digit number (inclusive)

  // Generate a random number between min and max
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString(); // Convert the number to a string
}

exports.createReward = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Count the number of reviews for the user
    const reviewCount = await Review.countDocuments({ userId });

    // Check if the user has at least 4 reviews in the reviews table
    if (reviewCount < 4 || reviewCount % 4 !== 0) {
      return res
        .status(400)
        .json({ message: "User does not meet the review count criteria" });
    }

    // Check if the user already has a reward in the rewards table
    const rewardCount = await Reward.countDocuments({ userId });

    if (rewardCount > 0) {
      return res.status(400).json({ message: "User already has a reward" });
    }

    // Create a new reward
    const rewardData = {
      userId,
      voucherNo: generateRandomNumber(),
      date: new Date(),
    };

    const newReward = await Reward.create(rewardData);

    res
      .status(201)
      .json({ message: "Reward created successfully", reward: newReward });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRewards = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find rewards for the user
    const rewards = await Reward.find({ userId });

    res.status(200).json({ rewards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
