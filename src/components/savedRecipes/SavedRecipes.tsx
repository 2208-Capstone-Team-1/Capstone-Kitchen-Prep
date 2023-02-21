import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setRecipes } from "../../store/recipeSlice";
import { RootState } from "../../store";
import RecipeCard from "./RecipeCard";

// interface Props {
//   user: {
//     id: string;
//   };
// }

const SavedRecipes = () => {
  //customs hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //selectors
  const { recipes } = useSelector((state: RootState) => state.recipe);
  const { user } = useSelector((state: RootState) => state.user);

  //fetch all recipes data
  const fetchRecipes = async () => {
    const recipes = await axios.get(`/api/users/${user.id}`);
    dispatch(setRecipes(recipes.data.recipes));
  };

  useEffect(() => {
    fetchRecipes();
  }, [user]);

  return (
    <div className="savedRecipe_container">
      <h1 className="savedRecipe_h1">Saved Recipes</h1>
      <div className="savedRecipeBody">
        {recipes?.length &&
          recipes.map((recipe, index: number) => {
            return (
              <div className="savedRecipe_item" key={index}>
                <a href={recipe.url}>
                  <RecipeCard recipe={recipe} index={index} />
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SavedRecipes;
