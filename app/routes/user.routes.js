const express = require('express');
const Middleware = require('../middleware/index.js');
const UserValidator = require("../validation/user.validate")
const router = express.Router()
const UserController = require("../controllers/user.controller.js");

// Create a new User
router.post("/", UserValidator.checkCreateUser(), Middleware.handlerValidationError, UserController.create);
router.get("/", UserController.findAll);
router.post("/find/:title", UserController.findTitle);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router