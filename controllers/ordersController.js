const express = require('express');
const router = express.Router();
const {countDate, addNewOrder, checkExistance} = require('../services/ordersService');
const { 
    deleteCart
} = require('../services/cartServices');



router.get('/checkExistance/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;
        const order = await checkExistance(clientId);
        return res.json({date: order.created_at});
    }catch(err) {
        console.log(err);
        return res.sendStatus(400);
    };
});

router.post('/addOrder', async (req, res) => {
    const { cartId, price, city, street, clientId, deliveryDate, creditCard } = req.body;
    const count = await countDate(deliveryDate);
    if (count > 2) {
        return res.json({failure: 'all the orders on this date are taken. please choose another date'});
    }
    const newOrder = await addNewOrder(cartId, price, city, street, clientId, deliveryDate, creditCard);
    await deleteCart(cartId);
    return res.json({success: newOrder._id});
})

module.exports = router;

