const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  getAllBrands,
  getSingleBrand,
  addBrand,
} = require("../controllers/brands");
const { requireSignin } = require("../middlewares/auth.js");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file) {
      const name = req.body.name;
      if (!fs.existsSync("./uploads/brands/" + name)) {
        fs.mkdirSync("./uploads/brands/" + name);
      } else {
        try {
          fs.rmSync("./uploads/brands/" + name, { recursive: true });
          fs.mkdirSync("./uploads/brands/" + name);
        } catch (err) {
          console.error(err);
        }
      }
      cb(null, "uploads/brands/" + name);
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file?.fieldname +
        "-" +
        Date.now() +
        file?.originalname.toLowerCase().split(" ").join("-")
    );
  },
});

const upload = multer({ storage: storage });

router.post("/", addBrand);
router.get("/", getAllBrands);
router.get("/:name", getSingleBrand);
// router.delete("/:id", deleteCategory);
// router.put("/:id", upload.single("image"), updateCategory);

module.exports = router;
