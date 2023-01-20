import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { setRecipes } from "../../store/recipeSlice";
import { RootState } from "../../store";
const SavedRecipes = () => {
  //customs hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //selectors
  const { recipes } = useSelector((state: RootState) => state.recipe);

  //fetch all recipes data
  const fetchRecipes = async () => {
    const recipes = await axios.get("http://localhost:3000/api/recipes");
    dispatch(setRecipes(recipes.data));
  };

  useEffect(() => {
    fetchRecipes();
    console.log("***", recipes);
  }, []);
  console.log("***", recipes);
  return (
    <>
      <div>SavedRecipes</div>
      {recipes?.length &&
        recipes.map((recipe) => {
          return <p>{recipe.name}</p>;
        })}
    </>
  );
};

export default SavedRecipes;
