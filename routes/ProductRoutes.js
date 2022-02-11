const express = require('express');
const router = express.Router();
const { getAllProducts , createProduct, getMyProducts ,deleteProduct,updateProduct} = require('../controllers/ProductController'); 
const auth = require('../middlewares/authentication');

router.route('/').get(getAllProducts);
router.route('/myproduct').get(auth, getMyProducts).post(auth, createProduct);
router.route('/myproduct/:id').delete(auth, deleteProduct).patch(auth,updateProduct);

module.exports = router;