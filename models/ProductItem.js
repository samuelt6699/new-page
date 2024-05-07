const { knex } = require("../config/database");

class ProductItem {
  async createProduct(productData) {
    try {
      const result = await knex("ProductItems").insert(productData);
      return result[0];
    } catch (error) {
      throw error;
    }
  }
  async getAllProducts() {
    try {
      const products = await knex("ProductItems").select("*");
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await knex("ProductItems")
        .where("ProductId", productId)
        .first();
      return product;
    } catch (error) {
      throw error;
    }
  }
 



    async updateProduct(productId, productData) {
      try {
        const result = await knex('ProductItems')
            .where('ProductId', productId)
            .update(productData);
    
        // Optionally, immediately after update, fetch and log the updated row
        // const updatedProduct = await knex('ProductItems').where('ProductId', productId);
    
        return result;
      } catch (error) {
        console.error(`Error updating product ${productId}:`, error);
        throw error;
      }
    }
  
    mapProductDataToDbColumns(productData) {
      return {
          Name: productData.name,
          Description: productData.description,
          Price: productData.price,
          Brand: productData.brand,
          Model: productData.model,
          UpdatedAt: new Date(),
          CategoryId: productData.categoryId,
          Image1Url: productData.image1Url,
          Image2Url: productData.image2Url,
          Image3Url: productData.image3Url,
          Image4Url: productData.image4Url,
          Image5Url: productData.image5Url,
      };
  }


    async deleteProduct(productId) {
        try {
            const result = await knex('ProductItems').where('ProductId', productId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

     /*
 async getProductsByCategory(categoryId) {
        try {
            const products = await knex('ProductItems').where('CategoryId', categoryId);
            return products;
        } catch (error) {
            throw error;
        }
    }
   
    */
}

module.exports = new ProductItem();