import { createSlice } from "@reduxjs/toolkit";

export interface Recipe {
  recipes: [];
}

const initialState: Recipe = {
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
