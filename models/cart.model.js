const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    clientId: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = cartSchema;
