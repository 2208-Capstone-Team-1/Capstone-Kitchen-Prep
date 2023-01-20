import { createSlice } from "@reduxjs/toolkit";

interface RecipesObject {
  //   id: string;
  name: string;
  url: string;
  personal_note: string;
  calories: number;
}
export interface Recipe {
  recipes: RecipesObject[];
}

export const initialState: Recipe = {
  recipes: [],
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

//Action creators
export const { setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
