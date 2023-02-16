import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
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
  const [ingredientsNames, setIngredientsNames] = useState("");
  const [recipeId, setRecipeId] = useState(0);
  /** selectors */
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const { user } = useSelector((state: RootState) => state.user);

  console.log("user", user.id);
  console.log("ingredients", ingredients);
  /**
   * This function will combine all the ingredients names in a single string and pass it to the API endpoint
   */

  function allIngredientsNames(ingredientArray: any) {
    let ingredientNamesForRecipes: string[] = [];
    if (user.id) {
      for (let i = 1; i < ingredientArray.length; i++) {
        ingredientNamesForRecipes.push(ingredientArray[i].name);
      }
      setIngredientsNames(ingredientNamesForRecipes.join(",+"));
    }
  }

  console.log("ingredientsNames", ingredientsNames);
  const recipesHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients[0].name}${ingredientsNames}&number=02e3c87c14f54629885c45eaa15f0617`
      );
      const recipeId = data[0]?.id;
      setRecipeId(recipeId);
      if (recipeId) {
        recipeInfoHandler(recipeId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const recipeInfoHandler = async (recipeId: number) => {
    if (recipeId) {
      // pass the id of the recipe to another endpoint to get the recipe data.
      const recipeInfo = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=02e3c87c14f54629885c45eaa15f0617`
      );
      setRecievedRecipesInfo(recipeInfo.data as any);
      setloading(true);
    }
  };

  useEffect(() => {
    if (user.id) {
      allIngredientsNames(ingredients);
      recipesHandler();
    }
  }, [user.id]);

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
                    <div key={index}>
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
              {/* {recievedRecipesInfo.analyzedInstructions[0].steps!.map(
                (step: any) => {
                  return (
                    <p className="recipe_ptag" key={step.number}>
                      {step.number}: {step.step}
                    </p>
                  );
                }
              )} */}
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
