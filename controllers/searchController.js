const Search = require('../models/Search');

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Search.getProductsByCategory(categoryName);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products by category:", error.message || error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

// Add this if you want a separate endpoint for search term functionality
exports.getProductsBySearchTerm = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const products = await Search.getProductsBySearchTerm(searchTerm);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching for products:", error.message || error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};