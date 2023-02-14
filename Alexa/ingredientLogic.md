const axios = require('axios'); 


// getting datas from user's db model. In this case, this is for Moe.
module.exports.fetchIngredientApi = async function fetchIngredientApi(id){
    
    let endpoint = "https://chefs-kiss.onrender.com";
    let url = endpoint + `/api/users/${id}`;
    let config = {
        timeout: 8000
    }

    try {

        let response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.log('ERROR', error);
        return null;
    }
}