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

  const mainImageUrl = req.files["mainImage"]
    ? req.files["mainImage"][0].path.replace(/\\/g, "/")
    : null;

  // Assign each image URL to the corresponding field based on your schema
  const productData = {
    name,
    description,
    price,
    categoryId,
    Brand: null, // Assuming you're not dealing with brand in the submission
    Model: null, // Assuming you're not dealing with model in the submission
    Image1Url: mainImageUrl,
  };
  for (let i = 1; i <= 4; i++) {
    productData[`Image${i + 1}Url`] = req.files[`additionalImage${i}`]
      ? req.files[`additionalImage${i}`][0].path.replace(/\\/g, "/")
      : null;
  }
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

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;

  const productUpdates = {...req.body};

  // Handle file uploads
  if (req.files) {
    if (req.files["mainImage"]) {
      productUpdates.Image1Url = req.files["mainImage"][0].path.replace(
        /\\/g,
        "/"
      );
    }

    // Additional images
    for (let i = 1; i <= 4; i++) {
      const additionalImageKey = `additionalImage${i}`;
      if (req.files[additionalImageKey]) {
        productUpdates[`Image${i + 1}Url`] = req.files[
          additionalImageKey
        ][0].path.replace(/\\/g, "/");
      }
    }
  }

  // Filter out undefined properties
  const filteredUpdates = Object.entries(productUpdates).reduce((acc, [key, value]) => {
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});

  // Abort if no updates provided
  if (Object.keys(filteredUpdates).length === 0) {
    return res.status(400).json({ message: 'No update data provided' });
  }

  try {
    const result = await ProductItem.updateProduct(productId, filteredUpdates);
    if (result === 0) {
      return res.status(404).json({ message: "Product not found" });
    }


    res.status(200).json({ message: "Product updated successfully", result });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await ProductItem.deleteProduct(productId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message || error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};


/*
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
