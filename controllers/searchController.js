const search = require('../models/search');
/*
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await search.getProductsByCategory(categoryName);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products by category:', error);
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
};
*/
// Search products by description
exports.searchProducts = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const products = await search.searchProducts(query);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Failed to search products' });
  }
};