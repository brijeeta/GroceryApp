export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

export const saveProduct = (productData, token) => {
    return fetch('/api/products', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData)
    });
};

export const deleteProduct = (productId, token) => {
    return fetch(`/api/users/products/${productId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
};

export const searchKroger = (query) => {
    return fetch(`LINK WITH ${query}`);
};