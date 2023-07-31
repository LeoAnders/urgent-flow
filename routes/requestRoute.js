const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
const { ensureAuthenticated } = require("../controllers/auth")

router.use(methodOverride('_method'));
const requestController = require("../controllers/requestController");

router.get("/", ensureAuthenticated, requestController.filterCurrentDay)
router.get("/done", ensureAuthenticated, requestController.latestFiltering)
router.get("/", ensureAuthenticated, requestController.allRequests)
router.get("/done", ensureAuthenticated, requestController.loadFinishedRequests)

router.post("/", express.urlencoded({ extended:true }), requestController.addRequest);
router.post("/done/:id", express.urlencoded({ extended:true }), requestController.addFinishedRequest)

router.delete("/done/:id", requestController.deleteRequest)
router.delete("/done", express.urlencoded({ extended:true }), requestController.deleteRequest)

module.exports = router