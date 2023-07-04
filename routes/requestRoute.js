const express = require("express")
const router = express.Router()
const linkController = require("../controllers/controller")

router.get("/", (req, res) => { res.send("Hello World") })
router.get("/:name", linkController.redirect)

module.exports = router
