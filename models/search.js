const { knex } = require("../config/database");

class Search {
    async getProductsByCategory(categoryName) {
        try {
            const products = await knex('ProductItems')
                .join('Categories', 'ProductItems.CategoryId', 'Categories.CategoryId')
                .where('Categories.Name', categoryName)
                .select('ProductItems.*');
            return products;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Search();