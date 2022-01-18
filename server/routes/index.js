const router = require('express').Router();
const { default: axios } = require('axios');

require('dotenv').config();
const { SPOONACULAR_API_KEY } = process.env

router.use('/api/search/:term', (req, res) => {
    const token = SPOONACULAR_API_KEY;
    const response = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/food/products/search?apiKey=${token}&query=${req.params.term}`
    });
    return response.data;
});