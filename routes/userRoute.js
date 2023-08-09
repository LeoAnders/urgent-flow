const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/login", userController.userLogin)
router.get("/register", userController.userRegister)
router.get("/logout", userController.userLogout)

router.post("/register", express.urlencoded({ extended:true }), userController.registerHandle)
router.post("/login", express.urlencoded({ extended:true }), userController.userPassport)

module.exports = router