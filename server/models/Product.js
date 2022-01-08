const { truncate } = require('fs');
const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;