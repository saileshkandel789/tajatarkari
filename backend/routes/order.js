const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware")
const orderController = require("../controllers/orderController");


router.post("/",protect, orderController.addOrder);
router.get("/" ,orderController.getOrders);
router.get("/:userId", orderController.getOrderByUser);

module.exports = router;
