const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");




router.post("/", categoryController.addCategory);

router.get("/", categoryController.getCategory);

router.get("/all", categoryController.getAllCategory);

router.post("/:categoryId", categoryController.deleteCategory);

module.exports = router;
