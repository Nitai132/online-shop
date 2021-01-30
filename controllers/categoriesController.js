const express = require('express');
const router = express.Router();
const { getCategories, getName } = require('../services/categoriesService');

router.get('/all', async (req, res) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    }
    catch(err) {
        res.sendStatus(400);
        console.log(err);
    };
});

router.get('/getName/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const name = await getName(id);
        return res.json(name);
    } catch(err) {
        res.sendStatus(400);
        console.log(err);
    };
});


module.exports = router;

