const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const {admin,protect} = require("../middleware/authMiddleware")



const multer = require("multer");

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

router.post("/",protect,admin, upload.single('image'), productController.addProduct);

router.get("/", productController.getProducts);

router.get("/allproduct", productController.getProductsList);


router.get("/:productId", productController.getProduct);

router.post("/:productId",protect,admin, productController.deleteProduct);

router.post("/:productId/review",protect, productController.createProductReview);



module.exports = router;

