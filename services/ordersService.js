const mongoose = require('mongoose');
const ordersSchema = require('./../models/orders.model');

const Order = mongoose.model('Order', ordersSchema);


//get amount of orders
const CountOrders = async () => {
    try {
        const count = await Order.find({}).countDocuments();
        return count;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const countDate = async (deliveryDate) => {
    try {
        const countDate = await Order.find({deliveryDate: deliveryDate}).countDocuments();
        return countDate;
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const addNewOrder = async (cartId, price, city, street, clientId, deliveryDate, creditCard) => {
    const o = new Order({ cartId, price, city, street, clientId, deliveryDate, creditCard});
    return await o.save();
};

const checkExistance = async (clientId) => {
    try {
        const order = await Order.find({clientId: clientId});
        return order[0];
    }catch(err) {
        console.log(err);
        throw err;
    };
};

module.exports = { CountOrders, addNewOrder, countDate, checkExistance };