import { createSlice } from "@reduxjs/toolkit";

// define a type for the slice state
interface singleIngredient {
  id: number;
  name: string;
  // quantity: number;
  image: string;
}

interface initialStateType {
  // wildcard: allows us to use something that's not specified
  [x: string]: any;
  ingredients: Array<singleIngredient>;
  hasError: boolean;
}

const initialState: initialStateType = {
  ingredients: [],
  hasError: false,
};

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    // specify what we expect to take in
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    // specify what we expect to take in
    addIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    // specify what we expect to take in
    clearIngredients: (state) => {
      state.ingredients = [];
    },
    setDeleteIngredient: (state, action) => {
      state.ingredients = [
        ...state.ingredients.filter((ingredient) => {
          return ingredient.id !== action.payload;
        }),
      ];
    },
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

export const {
  setIngredients,
  addIngredient,
  clearIngredients,
  setDeleteIngredient,
  setHasError,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
