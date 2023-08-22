const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

router.use(methodOverride("_method"));
const requestController = require("../controllers/requestController");

router.get("/", requestController.allRequests);
router.get("/done", requestController.loadFinishedRequests);
router.get("/edit/:id", requestController.loadEdit);

router.post(
  "/",
  express.urlencoded({ extended: true }),
  requestController.addRequest,
);
router.post(
  "/done/:id",
  express.urlencoded({ extended: true }),
  requestController.addFinishedRequest,
);
router.post(
  "/filter",
  express.urlencoded({ extended: true }),
  requestController.inputFilter,
);
router.post(
  "/edit/:id",
  express.urlencoded({ extended: true }),
  requestController.editRequest,
);
router.post(
  "/restore/:id",
  express.urlencoded({ extended: true }),
  requestController.restoreRequest,
);

router.delete("/done/:id", requestController.deleteRequest);
router.delete(
  "/done",
  express.urlencoded({ extended: true }),
  requestController.deleteRequest,
);

module.exports = router;
