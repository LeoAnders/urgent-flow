const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/login", userController.userLogin)
router.get("/register", userController.userRegister)

router.post("/register", express.urlencoded({ extended:true }), userController.registerHandle)
router.post("/login",express.urlencoded({ extended:true }), userController.loginHandle)

module.exports = router