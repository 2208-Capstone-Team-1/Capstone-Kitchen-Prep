let recipeArr = []; // extracted recipe object is pushed in

const savedRecipeGrabber = (obj) =>{
    recipeArr.push(obj);
    let instruction = recipeArr[0].analyzedInstructions[0].steps;
    return instruction;
}

// all needed ingredients are collected
// to use them, iterate through them & look for name key
// measurements are measures.us.amount & measures.us.unitShort
let neededIngredient = recipeArr[0].extendedIngredients;

// instruction variable stores recipe's instructions. 
// iterate through them -> cooking step by step
let instruction = recipeArr[0].analyzedInstructions[0].steps;

const firstInstruction = () => {
    // when cooking begins, it will shift() the instruction array
    // and read it out
    let step = instruction.shift();
    return step.step;
    // now the very first step of instruction is gone and used!
};

const nextInstruction = () => {
    if(instruction.length === 0){
        return "Congratulation. Your meal is finished. I hope you enjoy your meal."
    }
    let step = instruction.shift(); 
    return step.step;
}

module.exports = {
  savedRecipeGrabber,
  firstInstruction,
  nextInstruction,
};
