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

  // get the id for the recipe.
  const id: number[] =
    recievedRecipes &&
    recievedRecipes.map((recipe: receivedRecipesObj) => {
      return setRecipeId(recipe.id);
    });
  console.log("id", id);

  const recipesHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients[0].name}${ingredientsNames}&number=1&apiKey=1ffd1160eeea4483b4a8c3c5dc94a9ed`
      );
      // this data will include title and id and other data about the recipe and ingredients.
      // take the id and search another endpoint to extract more instructions about the recipes.
      setRecievedRecipes(data);
      console.log(
        `******* This is the path: https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=1ffd1160eeea4483b4a8c3c5dc94a9ed`
      );
      // if (id) {
      //   // pass the id of the recipe to another endpoint to get the recipe data.
      //   const recipeInfo = await axios.get(
      //     `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=bd758414abcc4276ab40dd407756e3d9`
      //   );
      //   setRecievedRecipesInfo(recipeInfo.data as any);
      //   setloading(true);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const recipeInfoHandler = async () => {
    if (id) {
      // pass the id of the recipe to another endpoint to get the recipe data.
      const recipeInfo = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=1ffd1160eeea4483b4a8c3c5dc94a9ed`
      );
      setRecievedRecipesInfo(recipeInfo.data as any);
      setloading(true);
    }
  };

  useEffect(() => {
    allIngredientsNames(ingredients);
    recipesHandler();
  }, []);

  useEffect(() => {
    if (recipeId) {
      recipeInfoHandler();
    }
  }, [recipeId]);

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
