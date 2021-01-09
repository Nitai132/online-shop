const mongoose = require('mongoose');
const categoriesSchema = require('./../models/category.model');

const Category = mongoose.model('Category', categoriesSchema);


//get amount of orders
const getCategories = async () => {
    try {
        const categories = await Category.find({});
        return categories;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

module.exports = { getCategories };