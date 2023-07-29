const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// Login Page
router.get("/login", userController.userLogin)

// Register page
router.get("/register", userController.userRegister)

//Register handle
router.post("/register", express.urlencoded({ extended:true }), userController.registerHandle)
module.exports = router