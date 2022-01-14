import axios from 'axios';

const { KROGER_CLIENT_ID, KROGER_CLIENT_SECRET } = process.env;

const krogerAuth = () => {
    const name = 'Kroger_Token';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    let krogerToken = '';

    for (i=0; i<ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            krogerToken = c.substring(name.length, c.length);
        } else {
            krogerToken = '';
        }

    }
    if (krogerToken === '') {
        axios({
            method: 'post',
            url: 'https://api.kroger.com/v1/connect/oauth2/token',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : `Basic ${btoa(KROGER_CLIENT_ID + ':' + KROGER_CLIENT_SECRET)}`},
            data: 'grant_type=client_credentials&scope=product.compact' 
        });
    krogerToken = Response.access_token;
    document.cookie = name + '=' + krogerToken + ';expires=' + Response.expires_in;
    } 
    return krogerToken;
}

const krogerSearch = (term) => {
    const token = new Promise(krogerAuth());
    token.then(
        axios({
            method: 'get',
            url: `https://api.kroger.com/v1/products?filter.limit=10&filter.term=${term}`,
            headers: { 'Accept': 'application/json',
                'Authorization': `Bearer ${token}`}   
        })
    );
        return Response;
}

export default { krogerAuth, krogerSearch }