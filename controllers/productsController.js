const express = require('express');
const router = express.Router();
const { getProducts, getDetails, addNewProduct, editProduct } = require('../services/productsService');


router.get('/getByCategory/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const products = await getProducts(id);
        res.json(products);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.get('/getDetails/:id', async (req, res)=> {
    try {
        const {id} = req.params;
        const details = await getDetails(id);
        res.json(details);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.post('/addNewProduct', async (req, res) => {
    const { name, category, price, img } = req.body;
    try {
        await addNewProduct(name, category, price, img);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});

router.post('/editProduct', async (req, res) => {
    const {_id, name, price, img } = req.body;
    try {
        await editProduct(_id, name, price, img);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    };
});


module.exports = router;
