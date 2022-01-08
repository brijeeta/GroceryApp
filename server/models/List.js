const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
    products: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const List = mongoose.model('List', listSchema);

module.exports = List;