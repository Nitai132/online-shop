const express = require('express');
const router = express.Router();
const { CountOrders } = require('../services/ordersService');
const { CountProducts } = require('../services/productsService');

router.get('/orders', async (req, res) => {
    try {
        const count = await CountOrders();
        res.json(count);
    } catch(err) {
        res.sendStatus(400);
        console.log(err);
    };
});

router.get('/products', async (req, res) => {
    try {
        const count = await CountProducts();
        res.json(count);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
})
module.exports = router;