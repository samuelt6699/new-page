const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/category/:categoryName', searchController.getProductsByCategory);
router.get('/term', searchController.getProductsBySearchTerm); 

module.exports = router;