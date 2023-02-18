```js
const axios = require("axios");

//takes in url and look for recipe that matches the ingredient
const recipefinder = async (url) => {
    let url  = url;
    try {
        let response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log('ERROR', error);
        return null;
    }
};

module.exports = {
  recipefinder,
};
```