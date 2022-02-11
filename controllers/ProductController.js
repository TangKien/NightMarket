const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const asyncWrapper = require('../middlewares/asyncWrapper');

const getAllProducts = asyncWrapper( async (req, res) => {
    const products = await Product.find();
    res.status(201).json({ products });
})

const createProduct = asyncWrapper(async (req, res) => {
    const seller = req.user;
    const { productName, brand, condition } = req.body;
    if (!productName || !brand || !condition) {
        throw new Error('Please provide enough product information');
    }
    const newProduct = await Product.create({
        productName,
        brand,
        condition,
        description: req.body.description || '',
        sellerId: seller._id,
        sellerName: seller.username,
        sellerContact: req.body.sellerContact || seller.contact
    })
    res.status(201).json({ newProduct });
});

const getMyProducts = asyncWrapper(async (req, res) => {
    const seller = req.user;
    const products = await Product.find({ sellerId: seller._id });
    res.status(201).json({ products });
})

const deleteProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        if (product.sellerId.toString() != req.user._id.toString()) {
            throw new Error('You are not allow to do this operation');
        }
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        throw new Error('No product found');
    }
})

const updateProduct = asyncWrapper(async (req, res) => {
    const { productName, brand, condition, description, sellerContact, productStatus } = req.body;
   const product = await Product.findById(req.params.id);
    if (product) {
        if (product.sellerId.toString() != req.user._id) {
            throw new Error('You are not allow to do this operation');
        }
            if (!productName || !brand || !condition) {
        throw new Error('Please provide enough information');
    }
        product.productName = productName;
        product.brand = brand;
        product.condition = condition;
        product.description = description || product.description;
        product.sellerContact = sellerContact || product.sellerContact;
        product.productStatus = productStatus || product.productStatus;
        const updatedProduct = await product.save();
        res.status(201).json({ updatedProduct });
    } else {
        throw new Error('Product Not Found');
    }
})
module.exports = { getAllProducts,createProduct,getMyProducts ,deleteProduct,updateProduct};