const mongoose = require('mongoose');
const productSchema = require('../models/product.model');

const Product = mongoose.model('Product', productSchema);


//get amount of products
const CountProducts = async () => {
    try {
        const count = await Product.find({}).countDocuments();
        return count;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const getProducts = async (id) => {
    try {
        const products = await Product.find({category: id});
        return products;
    } catch (err) {
        console.log(err);
        throw err;
    };
};

const getDetails = async (id) => {
    try {
        const prod = await Product.find({_id: id});
        return prod;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const addNewProduct = async (name, category, price, img) => {
    try {
        const p = new Product({ name: name, category: category, price: price, img: img });
        await p.save();
        return p;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const editProduct = async (_id, name, price, img) => {
    try {
        return await Product.updateOne({_id: _id }, {name: name, price: price, img: img });
    } catch(err) {
        console.log(err);
        throw err;
    };
};

module.exports = { CountProducts, getProducts, getDetails, addNewProduct, editProduct};