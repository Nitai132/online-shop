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

const getName = async (id) => {
   try {
       console.log(id);
       const category = await Category.findOne({_id: id})
       return category.name
   } catch(err) {
       console.log(err);
       throw err;
   }
}

module.exports = { getCategories, getName };