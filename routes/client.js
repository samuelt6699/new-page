const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../models/authenticateToken'); // Ensure this points to your middleware file

// Sign up route
router.post('/signup', clientController.signup);

// Login route
router.post('/login', clientController.login);

// Change Password route with authentication
//router.post('/change-password', authenticateToken, clientController.changePassword);

module.exports = router;