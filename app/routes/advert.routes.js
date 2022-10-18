const express = require('express');
const Middleware = require('../middleware/index.js');
const AdvertValidator = require("../validation/advert.validate")
const router = express.Router()
const AdvertController = require("../controllers/advert.controller.js");

// Create a new Advert
router.post("/", AdvertValidator.checkCreateAdvert(), Middleware.handlerValidationError, AdvertController.create);
router.get("/", AdvertController.findAll);
router.post("/find/:title", AdvertController.findTitle);
router.put("/:id", AdvertController.update);
router.delete("/:id", AdvertController.delete);

module.exports = router