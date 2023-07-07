const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router.get("/", requestController.allRequests)
router.get("/done", requestController.loadFinishedRequests)

router.post("/", express.urlencoded({ extended:true }), requestController.addRequest);
router.post("/done/:id", express.urlencoded({ extended:true }), requestController.addFinishedRequest)

module.exports = router