const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    clientId: String,
    cartId: String,
    price: Number,
    city: String,
    street: String,
    deliveryDate: String,
    creditCard: Number
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = ordersSchema;
