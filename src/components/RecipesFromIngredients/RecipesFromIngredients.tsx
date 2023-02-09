import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface recipesObj {
  [key: string]: any;
}

interface receivedRecipesObj {
  [key: string]: any;
}

const RecipesFromIngredients = () => {
  /**local states */
  const [recievedRecipes, setRecievedRecipes] = useState<recipesObj>();
  /** selectors */
  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  /**
   * This function will combine all the ingredients names in a single string and pass it to the API endpoint
   */
  let ingredientsNames: any = [];
  function allIngredientsNames(ingredientArray: any) {
    for (let i = 1; i < ingredientArray.length; i++) {
      ingredientsNames.push(ingredientArray[i].name);
    }
    return ingredientsNames.join(",+");
  }

  /**
   * 1. get the ingredients from the fridge.
   * 2. dynamically add the ingredients to the api endpoint.
   * 3. fetch the endpoint for recipes based on the passed ingredients to the endpoint.
   * 4. save the recipes in the database- create an endpoint to save the recipes.
   * 5. create slice to save the recipes to update the UI.
   */

  const recipesHandler = async () => {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients[0].name}${ingredientsNames}&number=2&apiKey=9a0bda7b9e944e938fa0a538fd4a5a77`
    );
    console.log(data);
    setRecievedRecipes(data);
  };

  console.log("recievedRecipes", recievedRecipes);
  useEffect(() => {
    recipesHandler();
  }, []);

  return (
    <div>
      <div>RecipesFromIngredients</div>
      {recievedRecipes &&
        recievedRecipes.map((recipe: receivedRecipesObj) => {
          return <h2>{recipe.title}</h2>;
        })}
    </div>
  );
};

export default RecipesFromIngredients;
