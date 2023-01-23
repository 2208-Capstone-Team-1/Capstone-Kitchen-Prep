import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setIngredients } from "../../store/ingredientSlice";
import { RootState } from "../../store";
import MuiLoader from "../MuiLoader";

const Ingredient = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.user);
  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  //fetch ingredients by user
  const fetchIngredients = async () => {
    console.log("USER", user);
    try {
      const ingredients = await axios.get("/api/ingredients");
      dispatch(setIngredients(ingredients.data));
    } catch (err) {
      console.error(err);
    }
    // }
    setLoading(false);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  if (loading)
    return (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    );

  return (
    <>
      <h1>Ingredient Page</h1>
      {ingredients.map((ingredient, index) => {
        return (
          <p key={index}>
            Ingredient: {ingredient.ingredient} Quantity: {ingredient.quantity}
          </p>
        );
      })}
    </>
  );
};

export default Ingredient;
