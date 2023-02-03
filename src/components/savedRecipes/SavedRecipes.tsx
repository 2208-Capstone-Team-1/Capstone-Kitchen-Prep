import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setRecipes } from "../../store/recipeSlice";
import { RootState } from "../../store";
import RecipeCard from "./RecipeCard";

const SavedRecipes = () => {
  //customs hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //selectors
  const { recipes } = useSelector((state: RootState) => state.recipe);

  //fetch all recipes data
  const fetchRecipes = async () => {
    //!Change the Fetch recipe for a logged in user,
    //! instead of all users
    const recipes = await axios.get("/api/recipes");
    dispatch(setRecipes(recipes.data));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="savedRecipe_container">
      <h1 className="savedRecipe_h1">Saved Recipes</h1>
      <div className="savedRecipeBody">
        {recipes?.length &&
          recipes.map((recipe, index: number) => {
            return (
              <div className="savedRecipe_item" key={index}>
                <RecipeCard recipe={recipe} index={index} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SavedRecipes;
