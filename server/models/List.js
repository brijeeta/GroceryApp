const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    products: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const List = mongoose.model('List', listSchema);

module.exports = List;