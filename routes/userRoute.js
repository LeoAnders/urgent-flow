const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require("../controllers/authController");

router.get("/login", userController.userLogin);
router.get("/register", ensureAuthenticated, userController.userRegister);
router.get("/logout", userController.userLogout);

router.post(
  "/register",
  express.urlencoded({ extended: true }),
  userController.registerHandle,
);
router.post(
  "/login",
  express.urlencoded({ extended: true }),
  userController.userPassport,
);

module.exports = router;
