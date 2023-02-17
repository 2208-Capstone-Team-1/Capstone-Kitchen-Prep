```js
const axios = require("axios");

// id & ingredient from the database -> alexa skill -> as param
module.exports.addIngredient = async function addIngredient(id, ingredient){
    let data = {name: ingredient};
    try {
        await axios.post(`https://chefs-kiss.onrender.com/api/users/${id}/ingredients`, data);
    } catch (error) {
        console.log('ERROR AT POSTING INGREDIENT', error)
        return null;
    }
}```