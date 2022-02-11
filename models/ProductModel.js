const mongoose = require('mongoose');
const User = require('./UserModel');
const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: [true, 'Please provide the product name']
    },
    brand: {
        type: String,
        require: [true,'Please provide the product brand']
    },
    condition: {
        type: String,
        enum: {
            values: ['New', 'Used', 'LikeNew']
        }
    },
    description: {
        type: String
    },
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true,'Please provide seller']
    },
    sellerContact: {
        type: String,
        required: [true,'Please provide enough contract information']
    },
    sellerName: {
        type: String,
    },
    productStatus: {
        type: String,
        enum: {
            values: ['Available' , 'Sold']
        },
        default: 'Available'
    }
})

module.exports = mongoose.model('Product', ProductSchema);