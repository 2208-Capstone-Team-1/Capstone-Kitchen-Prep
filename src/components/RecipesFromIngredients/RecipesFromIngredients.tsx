import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import MuiLoader from "../MuiLoader";
import "../Recipe/recipe.css";

interface recipesObj {
  [key: string]: any;
}

interface receivedRecipesObj {
  [key: string]: any;
}

const RecipesFromIngredients = () => {
  /**local states */
  const [recievedRecipes, setRecievedRecipes] = useState<recipesObj>();
  const [recievedRecipesInfo, setRecievedRecipesInfo] = useState({} as any);
  const [loading, setloading] = useState(false);
  /** selectors */
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const { user } = useSelector((state: RootState) => state.user);

  /**
   * This function will combine all the ingredients names in a single string and pass it to the API endpoint
   */
  let ingredientsNames: any = [];
  function allIngredientsNames(ingredientArray: any) {
    if (user.id) {
      for (let i = 1; i < ingredientArray.length; i++) {
        ingredientsNames.push(ingredientArray[i].name);
      }
      return ingredientsNames.join(",+");
    }
  }

  // get the id for the recipe.
  const id: any =
    recievedRecipes &&
    recievedRecipes.map((recipe: receivedRecipesObj) => {
      // console.log("🪪id", recipe.id);
      return recipe.id;
    });

  const recipesHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients[0].name}${ingredientsNames}&number=1&apiKey=9b79c69e5e8943b88f963408824ce4a4`
      );
      // this data will include title and id and other data about the recipe and ingredients.
      // take the id and search another endpoint to extract more instructions about the recipes.
      setRecievedRecipes(data);
      console.log(
        `******* This is the path: https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=9b79c69e5e8943b88f963408824ce4a4`
      );
      if (id) {
        // pass the id of the recipe to another endpoint to get the recipe data.
        const recipeInfo = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=9b79c69e5e8943b88f963408824ce4a4`
        );
        setRecievedRecipesInfo(recipeInfo.data as any);
        setloading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    recipesHandler();
    allIngredientsNames(ingredients);
  }, [id]);

  // if loading is false, display an error message
  if (!loading) {
    return (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    );
  }

  const imageURL = recievedRecipesInfo && `${recievedRecipesInfo.image}`;

  return (
    <>
      <div className="recipe_body">
        <div className="recipe_container">
          <div className="recipe_box">
            <h1 className="recipe_h1">Recipe based on What You Have</h1>
            <h2 className="recipe_h2">{recievedRecipesInfo.title}</h2>
            <img className="recipe_img" src={imageURL} />
            <h2 className="recipe_h2">Ingredients</h2>
            <div className="recipe_ingredients">
              {recievedRecipesInfo.extendedIngredients.map(
                (foodItem: any, index: number) => {
                  return (
                    <div>
                      <p className="recipe_ptag">
                        {index}: {foodItem.original}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
            <h2 className="recipe_h2">Recipe</h2>
            <div className="recipe_instruction">
              {recievedRecipesInfo.analyzedInstructions[0].steps.map(
                (step: any) => {
                  return (
                    <p className="recipe_ptag" key={step.number}>
                      {step.number}: {step.step}
                    </p>
                  );
                }
              )}
            </div>
            <div className="recipe_diet">
              {recievedRecipesInfo.diets.map((diet: string, index: number) => {
                return (
                  <p className="recipe_ptag" key={index}>
                    {" "}
                    # {diet}
                  </p>
                );
              })}
            </div>
            <div className="recipe_url">
              Source:{" "}
              <a className="recipe_atag" href={recievedRecipesInfo.sourceUrl}>
                {recievedRecipesInfo.sourceUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipesFromIngredients;
