const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const middleware = require("../middleware/jwt-middleware");

router.post("/login", userController.validateUser);
router.post("/register", userController.registerUser);

module.exports = router;
