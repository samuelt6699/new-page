const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
//const verifyAuth= require("../middleware/verifyAuth")

// Sign up route
router.post('/signup', vendorController.signup);

// Login route
router.post('/login', vendorController.login);

// Change Password
//router.post('/change_password',verifyAuth, vendorController.changePassword)

module.exports = router;
