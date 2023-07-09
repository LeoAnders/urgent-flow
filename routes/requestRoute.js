const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
const requestController = require("../controllers/requestController");

router.get("/", requestController.filterCurrentDay)
router.get("/", requestController.allRequests)
router.get("/done", requestController.loadFinishedRequests)

router.post("/", express.urlencoded({ extended:true }), requestController.addRequest);
router.post("/done/:id", express.urlencoded({ extended:true }), requestController.addFinishedRequest)

router.delete("/done/:id", requestController.deleteRequest)
router.delete("/done", express.urlencoded({ extended:true }), requestController.deleteRequest)

module.exports = router