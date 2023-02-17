```js
const axios = require("axios");

// getting user id from /api/users db 
module.exports.fetchID = async function fetchID(){
    let endpoint = "https://chefs-kiss.onrender.com";
    let url = endpoint + "/api/users";
    let id = "";
    let config = {
        timeout: 6500
    }

    try {
        let response = await axios.get(url, config);
        let userData = response.data;
        let user = userData[0] // this is moe
        id += user.id;
        return id;

    } catch (error) {
        console.log('ERROR', error)
        return null;
    }
}```