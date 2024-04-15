const Category = require("../models/Category");
const ProductItem = require("../models/ProductItem");

exports.createProduct = async (req, res) => {
  const { name, description, price, categoryId } = req.body;

  if (!name || !description || !price || !categoryId) {
    return res.status(400).json({
      message: "Product name, price, description, and category are required.",
    });
  }

  const categoryExists = await Category.getCategoryById(categoryId);
  if (!categoryExists) {
    return res.status(400).json({ message: "Invalid CategoryId" });
  }

  

  const productData = {
    name,
    description,
    image: req.file ? req.file.path.replace(/\\/g, '/') : null,
    price,
    categoryId,
  };

  try {
    const result = await ProductItem.createProduct(productData);

    res.status(201).json({
      message: "Product created successfully",
      productId: result,
    });
  } catch (error) {
    console.error("Error creating product:", error.message || error);
    res.status(500).json({ message: "Failed to create product." });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductItem.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting all products:", error.message || error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductItem.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product by ID:", error.message || error);
    res.status(500).json({ message: "Failed to retrieve product" });
  }
};

/*


exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const result = await ProductItem.updateProduct(productId, productData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error.message || error);
        res.status(500).json({ message: 'Failed to update product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await ProductItem.deleteProduct(productId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error.message || error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};



exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await ProductItem.getProductsByCategory(categoryId);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error getting products by category:', error.message || error);
        res.status(500).json({ message: 'Failed to retrieve products by category' });
    }
};
*/
