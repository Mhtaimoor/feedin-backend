const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createUser,
  getUsers,
  register,
  login,
  registerVendor,
  vendorLogin,
  deleteUser,
  getProfile,
  updateUser,
} = require("../controllers/users");
const { requireSignin } = require("../middlewares/auth.js");
const Base_URL = require("../config");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log("starting upload...", req.file);
  res.json(`${Base_URL}public/users/` + req.file?.filename);
});

router.put("/:id", upload.single("editImage"), updateUser);

router.post("/register", register);
router.post("/login", login);
router.post("/venderRegister", registerVendor);
router.post("/venderLogin", vendorLogin);
router.post("/", createUser);

router.get("/", getUsers);
router.get("/profile/:id", getProfile);
router.delete("/:id", deleteUser);

module.exports = router;
