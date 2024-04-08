const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


// Sign up route
router.post('/signup', clientController.signup);

// Login route
router.post('/login', clientController.login);


//router.get('/firstName', clientController.firstName);

// Change Password



module.exports = router;
