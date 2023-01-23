import { createSlice } from "@reduxjs/toolkit";

// define a type for the slice state
interface singleIngredient {
  ingredient: string;
  quantity: number;
}

interface initialStateType {
  // wildcard: allows us to use something that's not specified
  [x: string]: any;
  ingredients: Array<singleIngredient>;
}

const initialState: initialStateType = {
  ingredients: [],
};

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    // specify what we expect to take in
    setIngredients: (state, action) => {
      state.ingredientsObj = action.payload;
    },
    // specify what we expect to take in
    addIngredient: (state, action) => {
      state.ingredientsObj = [...state.ingredientsObj, action.payload];
    },
    // specify what we expect to take in
    clearIngredients: (state) => {
      state.ingredientsObj = [];
    },
  },
});

export const { setIngredients, addIngredient, clearIngredients } =
  ingredientSlice.actions;
export default ingredientSlice.reducer;
