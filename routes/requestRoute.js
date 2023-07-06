const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router.get("/", requestController.allRequests)

router.post("/", express.urlencoded({ extended:true }), requestController.addRequest);


module.exports = router