const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route for getting products by category
router.get('/category/:categoryName', searchController.getProductsByCategory);

// Route for searching products by description
router.get('/search', searchController.searchProducts);

module.exports = router;