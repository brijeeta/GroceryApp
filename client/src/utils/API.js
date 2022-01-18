export const searchSpoon = (query) => {
    return fetch(`https://api.spoonacular.com/food/products/search?query=${query}&apiKey=`)
}