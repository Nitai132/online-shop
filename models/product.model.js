const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    img: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = productSchema;
