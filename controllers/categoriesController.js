const express = require('express');
const router = express.Router();
const { getCategories } = require('../services/categoriesService');

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


module.exports = router;

