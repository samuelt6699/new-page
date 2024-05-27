const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); 
const productController = require('../controllers/productItemController');



const fields = [
  { name: 'mainImage', maxCount: 1 },
  { name: 'additionalImage1', maxCount: 1 },
  { name: 'additionalImage2', maxCount: 1 },
  { name: 'additionalImage3', maxCount: 1 },
  { name: 'additionalImage4', maxCount: 1 },
];

router.post('/', upload.fields(fields), productController.createProduct);

router.get('/:productId', productController.getProductById);

router.put('/:productId', upload.fields(fields), productController.updateProduct);

router.delete('/:productId', productController.deleteProduct);

router.get('/', productController.getAllProducts);



module.exports = router;
