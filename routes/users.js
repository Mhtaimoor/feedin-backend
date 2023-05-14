const express = require("express");
const multer = require("multer");
const {
  createUser,
  getUsers,
  register,
  login,
  deleteUser,
  getProfile,
  updateUser,
} = require("../controllers/users");
const { requireSignin } = require("../middlewares/auth.js");
const Base_URL = require("../config");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const router = express.Router();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log("starting upload...", req.file);
  res.json(`${Base_URL}users/` + req.file?.filename);
});

router.post("/register", register);
router.post("/login", login);
router.post("/", createUser);
router.put("/:id", upload.single("editImage"), updateUser);
router.get("/", getUsers);
router.get("/profile/:id", getProfile);
router.delete("/:id", deleteUser);

module.exports = router;
