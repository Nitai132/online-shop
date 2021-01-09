const mongoose = require('mongoose');
const cartSchema = require('../models/cart.model');
const cartProductsSchema = require('../models/cartProducts.model')
const Cart = mongoose.model('Cart', cartSchema);
const CartProduct = mongoose.model('CartProduct', cartProductsSchema)

const getCart = async (id) => {
    try {
        const cart = await Cart.find({clientId: id});
        return cart;
    } catch(err) {
        console.log(err)
        throw err;
    };
};

const createNewCart = async (id) => {
    const c = new Cart({clientId: id});
    await c.save();
    return c;
};

const addCartProduct = async (cartId, productId) => {
    try {
        const CheckExistance = await CartProduct.find({cartId: cartId, productId: productId});
        const itemExists = 'you already have this item in your cart. you can change the amount in your cart';
        if (CheckExistance.length > 0) {
          return {itemExists: itemExists};
        } else {
            const p = new CartProduct({ productId: productId, amount: 1, cartId: cartId});
            await p.save();
            return p;
        };
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const decreaseCartProduct = async (cartId, productId) => {
    try {
        const checkAmount = await CartProduct.find({cartId: cartId, productId: productId});
        if (checkAmount[0].amount == 1) {
            return {err: 'use the delete button to remove a product from your cart'};
        } else {
            return await CartProduct.updateOne({cartId: cartId, productId: productId }, { $inc: { amount: -1 } });
        }
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const increaseCartProduct = async (cartId, productId) => {
    try {
        return await CartProduct.updateOne({cartId: cartId, productId: productId }, { $inc: { amount: +1 } });
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const deleteCartProduct = async (cartId, productId) => {
    try {
        return await CartProduct.deleteOne({cartId: cartId, productId: productId});
    } catch(err) {
        console.log(err)
        throw err;
    }
}

const getAllCartProducts = async (cartId) => {
    try {
        return CartProduct.find({cartId: cartId})
    }catch(err) {
        console.log(err);
        throw err
    }
}

const deleteAllItems = async (cartId) => {
    try {
        return CartProduct.remove({cartId: cartId});
    } catch(err) {
        console.log(err);
        throw err;
    };
};

const deleteCart = async (cartId) => {
    try {
        return Cart.deleteOne({_id: cartId});
    } catch(err) {
        console.log(err);
        throw err;
    }
}
module.exports = { 
    getCart, 
    createNewCart, 
    addCartProduct, 
    decreaseCartProduct, 
    increaseCartProduct,
    deleteCartProduct, 
    getAllCartProducts,
    deleteAllItems,
    deleteCart
}