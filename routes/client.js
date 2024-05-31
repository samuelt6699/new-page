const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../models/authenticateToken');


// Sign up route
router.post('/signup', clientController.signup);

// Login route
router.post('/login', clientController.login);

//router.post('/verify', clientController.verify);

// Change Password route with authentication
//router.post('/change-password', authenticateToken, clientController.changePassword);

module.exports = router;