const search = require('../models/search');


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