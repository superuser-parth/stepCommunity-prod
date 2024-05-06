const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    minOrder: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    productImages: [{
        type: String, 
        required: true
    }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
