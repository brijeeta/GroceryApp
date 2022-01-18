const axios = require ('axios');
require('dotenv').config();
const { KROGER_CLIENT_ID, KROGER_CLIENT_SECRET } = process.env;

const krogerAuth = async () => {

    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.kroger.com/v1/connect/oauth2/token',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Basic ${Buffer.from(KROGER_CLIENT_ID + ':' + KROGER_CLIENT_SECRET).toString('base64')}`},
            data: 'grant_type=client_credentials&scope=product.compact' 
        });  
        return response.data.access_token
    } catch (err) {
        console.log(err.message);
    }

}


const krogerFetch = async (term) => {
    
    const token = await krogerAuth();
    const response = await axios({
        method: 'get',
        url: `https://api.kroger.com/v1/products?filter.limit=1&filter.term=${term}`,
        headers: { 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`}   
    });
    
    return response.data.data;

}


module.exports = krogerFetch;