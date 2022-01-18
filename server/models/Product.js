const { truncate } = require('fs');
const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

const { Schema } = mongoose;

const productSchema = new Schema({
    productId: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    Category: {
        type: String,
        required: false
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;