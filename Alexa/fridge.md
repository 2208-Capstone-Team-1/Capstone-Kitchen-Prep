
let fridgeStorage = [];

// below function takes the ingredient from the user & store it in fridgeStorage.
// this will be replaced with axios once we connect to our deployed site


const fridgeFiller = function(ingredient){
    fridgeStorage.push(ingredient);
}


module.exports = {
    fridgeFiller,
}