import axios from 'axios';

const { KROGER_CLIENT_ID, KROGER_CLIENT_SECRET } = process.env;

const krogerAuth = () => {
    axios({
        method: 'post',
        url: 'https://api.kroger.com/v1/connect/oauth2/token',
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : `Basic ${btoa(KROGER_CLIENT_ID + ':' + KROGER_CLIENT_SECRET)}`},
        data: 'grant_type=client_credentials&scope=product.compact' 
    });
    return Response;
}

const krogerSearch = (term) => {
    axios({
        method: 'get',
        url: `https://api.kroger.com/v1/products?filter.limit=10&filter.term=${term}`,
        headers: { 'Accept': 'application/json',
            'Authorization': `Bearer ${krogerAuth}`}   
    });
    return Response;
}

export default { krogerAuth, krogerSearch }