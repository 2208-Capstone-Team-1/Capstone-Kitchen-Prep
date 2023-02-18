```js
const axios = require("axios");

module.exports.recipeFetcher = async function recipeFetcher(url){
    try {
        let response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log('ERROR', error)
        return null;
    }
}```