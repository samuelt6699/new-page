const Category = require('../models/Category');

exports.createCategory = async (req, res) => {

    const {name, description} = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'category Name, And Description are required' });
    }
    const categoryData = { 
        Name: name,
        Description: description 
      };
    try {
       
        const result = await Category.createCategory(categoryData);

        const categoryId = result[0];

        res.status(201).json({ message: 'Category created successfully', categoryId });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Failed to create category' });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error getting all categories:', error);
        res.status(500).json({ message: 'Failed to retrieve categories' });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error getting category by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve category' });
    }
};
/*



exports.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const categoryData = req.body;
        const result = await Category.updateCategory(categoryId, categoryData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const result = await Category.deleteCategory(categoryId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};


*/
