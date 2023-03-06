const express = require("express");
var multer = require("multer");
const { Base_URL } = require("../config");

const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/reviews");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log("got-it");
  console.log("starting upload...", req.file);

  res.json(`${Base_URL}public/posts/` + req.file.filename);
});
router.post("/", upload.single("image"), createReview);
router.get("/", getReviews);
router.get("/:id", getReview);
router.put("/:id", upload.single("editImage"), updateReview);

router.delete("/:id", deleteReview);

module.exports = router;
