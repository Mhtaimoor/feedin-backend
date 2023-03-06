const express = require("express");
const {
  createUser,
  getUsers,
  register,
  login,
  deleteUser,
  getProfile,
} = require("../controllers/users");
const { requireSignin } = require("../middlewares/auth.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/", createUser);
router.get("/", getUsers);
router.get("/profile", requireSignin, getProfile);
router.delete("/:id", deleteUser);

module.exports = router;
