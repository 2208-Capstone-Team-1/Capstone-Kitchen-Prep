```js
const axios = require("axios");

// getting user id from /api/users db
module.exports.fetchNumber = async function etchNumber() {
  let endpoint = "https://chefs-kiss.onrender.com";
  let url = endpoint + "/api/users";
  let number = "";
  let config = {
    timeout: 6500,
  };

  try {
    let response = await axios.get(url, config);
    let userData = response.data;
    let user = userData[0]; // this is moe
    number += user.phoneNumber;
    return number;
  } catch (error) {
    console.log("ERROR", error);
    return null;
  }
};
```