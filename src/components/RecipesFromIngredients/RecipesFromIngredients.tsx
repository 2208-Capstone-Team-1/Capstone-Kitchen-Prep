import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import MuiLoader from "../MuiLoader";
import "../Recipe/recipe.css";
import { setIngredients } from "../../store/ingredientSlice";
import "./recipesFromIngredients.css";

// interface recipesObj {
//   [key: string]: any;
// }

const RecipesFromIngredients = () => {
  const dispatch = useDispatch();
  /**local states */
  const [recievedRecipesInfo, setRecievedRecipesInfo] = useState({} as any);
  const [loading, setloading] = useState(false);
  /** selectors */
  const { user } = useSelector((state: RootState) => state.user);

  /**
   * This function will combine all the ingredients names in a single string and pass it to the API endpoint
   */

  /** fetch ingredients by user */
  const fetchIngredients = async () => {
    try {
      const userData = await axios.get(`/api/users/${user.id}`);
      dispatch(setIngredients(userData.data.ingredients));
      // user -> ingredients
      if (userData) {
        const ingredientsLocal = userData.data.ingredients;
        const nameStrings = allIngredientsNames(ingredientsLocal);

        const { data } = await axios.get(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${nameStrings}&number=1&apiKey=bd758414abcc4276ab40dd407756e3d9`
        );
        if (data[0]?.id) {
          // this is waiting on the new state, not the current state
          const recipeId = data[0].id;
          console.log("id", recipeId);
          const recipeInfo = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=bd758414abcc4276ab40dd407756e3d9`
          );
          setRecievedRecipesInfo(recipeInfo.data as any);
          setloading(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  function allIngredientsNames(ingredientArray: any) {
    let ingredientNamesForRecipes: string[] = [];
    if (user.id && ingredientArray.length >= 0) {
      for (let i = 0; i < ingredientArray.length; i++) {
        ingredientNamesForRecipes.push(ingredientArray[i].name);
      }
      return ingredientNamesForRecipes.join(",+");
    }
  }

  // load
  useEffect(() => {
    if (user.id) {
      fetchIngredients();
    }
  }, [user]);

  const imageURL = recievedRecipesInfo && `${recievedRecipesInfo.image}`;

  return (
    // if loading is false, display an error message
    !loading ? (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    ) : (
      <>
        <div className="card-container">
          <div className="card u-clearfix">
            <div className="card-body">
              <span className="card-number card-circle subtle">01</span>
              <span className="card-author subtle">John Smith</span>
              <h2 className="card-title">New Brunch Recipe</h2>
              <span className="card-description subtle">
                These last few weeks I have been working hard on a new brunch
                recipe for you all.
              </span>
              <div className="card-read">Read</div>
              <span className="card-tag card-circle subtle">C</span>
            </div>
            <img
              src="https://s15.postimg.cc/temvv7u4r/recipe.jpg"
              alt=""
              className="card-media"
            />
          </div>
          <div className="card-shadow"></div>
        </div>
        {/* <div classNameNameName="recipe_body">
          <div classNameNameName="recipe_container">
            <div classNameNameName="recipe_box">
              <h1 classNameNameName="recipe_h1">Recipe based on What You Have</h1>
              <h2 classNameNameName="recipe_h2">{recievedRecipesInfo.title}</h2>
              <img classNameNameName="recipe_img" src={imageURL} />
              <h2 classNameNameName="recipe_h2">Ingredients</h2>
              <div classNameNameName="recipe_ingredients">
                {recievedRecipesInfo.extendedIngredients?.map(
                  (foodItem: any, index: number) => {
                    return (
                      <div key={index}>
                        <p classNameNameName="recipe_ptag">
                          {index + 1}: {foodItem.original}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
              <h2 classNameNameName="recipe_h2">Recipe</h2>
              <div classNameNameName="recipe_instruction">
                {recievedRecipesInfo.analyzedInstructions[0].steps!.map(
                  (step: any) => {
                    return (
                      <p classNameNameName="recipe_ptag" key={step.number}>
                        {step.number}: {step.step}
                      </p>
                    );
                  }
                )}
              </div>
              <div classNameNameName="recipe_diet">
                {recievedRecipesInfo.diets.map(
                  (diet: string, index: number) => {
                    return (
                      <p classNameNameName="recipe_ptag" key={index}>
                        {" "}
                        # {diet}
                      </p>
                    );
                  }
                )}
              </div>
              <div classNameNameName="recipe_url">
                Source:{" "}
                <a classNameNameName="recipe_atag" href={recievedRecipesInfo.sourceUrl}>
                  {recievedRecipesInfo.sourceUrl}
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </>
    )
  );
};

export default RecipesFromIngredients;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
