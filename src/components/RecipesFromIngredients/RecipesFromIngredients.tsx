import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import MuiLoader from "../MuiLoader";
import "../Recipe/recipe.css";
import { setIngredients } from "../../store/ingredientSlice";

interface recipesObj {
  [key: string]: any;
}

interface receivedRecipesObj {
  [key: string]: any;
}

const RecipesFromIngredients = () => {
  const dispatch = useDispatch();
  /**local states */
  const [recievedRecipes, setRecievedRecipes] = useState<recipesObj>();
  const [recievedRecipesInfo, setRecievedRecipesInfo] = useState({} as any);
  const [loading, setloading] = useState(false);
  const [ingredientsNames, setIngredientsNames] = useState("");
  const [recipeId, setRecipeId] = useState(0);
  /** selectors */
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const { user } = useSelector((state: RootState) => state.user);

  console.log("in", ingredients);
  /**
   * This function will combine all the ingredients names in a single string and pass it to the API endpoint
   */

  /** fetch ingredients by user */
  const fetchIngredients = async () => {
    try {
      const userData = await axios.get(`/api/users/${user.id}`);
      dispatch(setIngredients(userData.data.ingredients));
    } catch (err) {
      console.error(err);
    }
    setloading(false);
  };

  // function allIngredientsNames(ingredientArray: any) {
  //   let ingredientNamesForRecipes: string[] = [];
  //   if (user.id) {
  //     for (let i = 1; i < ingredientArray.length; i++) {
  //       ingredientNamesForRecipes.push(ingredientArray[i].name);
  //     }
  //     setIngredientsNames(ingredientNamesForRecipes.join(",+"));
  //   }
  // }

  console.log("ingredientsNames", ingredientsNames);

  const recipesHandler = async () => {
    let ingredientNamesForRecipes: string[] = [];
    let ingredientMapping = ingredients?.map((ingredientArray) => {
      console.log("ingredientArray", ingredientArray);
      return ingredientNamesForRecipes.push(ingredientArray.name);
    });
    setIngredientsNames(ingredientMapping.join(",+"));
    console.log("ingredientNamesForRecipes", ingredientNamesForRecipes);
    console.log("ingredientMapping ", ingredientMapping);
    console.log("ingredientsNames", ingredientsNames);
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients[0].name}${ingredientsNames}&number=1&apiKey=651b0d0fbf4f485eba85a4b5ba5bbe4e`
      );
      const recipeId = data[0]?.id;
      // console.log(recipeId);
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
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=651b0d0fbf4f485eba85a4b5ba5bbe4e`
      );
      setRecievedRecipesInfo(recipeInfo.data as any);
      setloading(true);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchIngredients();
      // allIngredientsNames(ingredients);
      recipesHandler();
    }
  }, []);

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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
