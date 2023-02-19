import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import MuiLoader from "../MuiLoader";
import "../Recipe/recipe.css";
import { setIngredients } from "../../store/ingredientSlice";
import "./recipesFromIngredients.css";
import { Button } from "@mui/material";

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
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${nameStrings}&number=1&apiKey=7c87c15418854c15bd35639c810f0955`
        );
        if (data[0]?.id) {
          // this is waiting on the new state, not the current state
          const recipeId = data[0].id;
          const recipeInfo = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=7c87c15418854c15bd35639c810f0955`
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

  // removing the html tags from summary.
  const regex = /(<([^>]+)>)/gi;
  const summary =
    recievedRecipesInfo.summary &&
    recievedRecipesInfo.summary.replace(regex, "");

  return (
    // if loading is false, display an error message
    !loading ? (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    ) : (
      <>
        {
          <div className="card-container">
            <div className="card u-clearfix">
              <div className="card-body">
                <div className="card-media">
                  <div>
                    {" "}
                    <img src={imageURL} width="350px;" alt="" />
                  </div>{" "}
                  <div className="vegan-image">
                    {recievedRecipesInfo.vegan ? (
                      <img src="../static/vegan.png" width="60px" alt="" />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="gluten-image">
                    {recievedRecipesInfo.glutenFree ? (
                      <img
                        src="../static/gluten-free.png"
                        width="60px"
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <h2 className="card-title">{recievedRecipesInfo.title}</h2>
                <span className="card-description subtle">{summary}</span>
                <div className="card-read">
                  <a
                    className="sourceUrl"
                    href={recievedRecipesInfo.spoonacularSourceUrl}
                    target="_blank"
                  >
                    Read Full Recipe
                  </a>
                </div>
                <div className="saveBtn">
                  <Button className="textBtn">Save</Button>
                </div>
              </div>
            </div>
            <div className="card-shadow"></div>
          </div>
        }
      </>
    )
  );
};

export default RecipesFromIngredients;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
