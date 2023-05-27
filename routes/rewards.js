const express = require("express");
const { createReward, getRewards } = require("../controllers/rewards");
const router = express.Router();

router.post("/:userId", createReward);
router.get("/:userId", getRewards);

module.exports = router;
