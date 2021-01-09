const express = require('express');
const router = express.Router();
const { 
    getCart, 
    createNewCart, 
    addCartProduct, 
    decreaseCartProduct,
    increaseCartProduct,
    deleteCartProduct,
    getAllCartProducts,
    deleteAllItems,
    deleteCart
} = require('../services/cartServices');

router.get('/findCart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await getCart(id);
        if (cart.length > 0) {
            res.json(cart[0]);
        } else {
            const newCart = await createNewCart(id);
            res.json(newCart);
        }
    } catch(err) {
        res.sendStatus(400);
        console.log(err);
    }
})

router.post('/addProduct', async (req, res)=> {
    const {cartId, productId} = req.body;
    try {
        const product = await addCartProduct(cartId, productId);
        return res.json(product);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.post('/decreaseProduct', async (req, res)=> {
    const {cartId, productId} = req.body;
    try {
        const decrease = await decreaseCartProduct(cartId, productId);
        return res.json({decrease});
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.post('/increaseProduct', async (req, res)=> {
    const {cartId, productId} = req.body;
    try {
        await increaseCartProduct(cartId, productId);
        return res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.post('/deleteProduct', async (req, res)=> {
    const {cartId, productId} = req.body;
    try {
        await deleteCartProduct(cartId, productId);
        return res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.get('/getAllProducts/:cartId', async (req,res) => {
    const {cartId} = req.params;
    try {
       const allProducts =  await getAllCartProducts(cartId);
        return res.json(allProducts);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };

});

router.get('/deleteAllProducts/:cartId', async (req,res) => {
    const { cartId } = req.params;
    try {
        await deleteAllItems(cartId);
        return res.sendStatus(200);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.get('/deleteCart/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        await deleteCart(cartId);
        return res.sendStatus(200);
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});


module.exports = router;
