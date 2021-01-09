const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartProductsSchema = new Schema({
    productId: String,
    amount: Number,
    cartId: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = cartProductsSchema;
