const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner");
const multer = require("multer");
const {admin,protect} = require("../middleware/authMiddleware")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/",protect,admin, upload.single("image"), bannerController.addBanner);

router.get("/", bannerController.getBanners);

router.get("/:bannerId", bannerController.getBanner);

router.post("/:bannerId",protect,admin, bannerController.deleteBanner);

module.exports = router;
