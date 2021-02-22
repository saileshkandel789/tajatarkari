const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware")
const addressController = require("../controllers/shippingAddress");


router.post("/",protect, addressController.addAddress);

router.get("/", addressController.getAddress);
router.get("/:userId" ,addressController.getUserAddress);

module.exports = router;
