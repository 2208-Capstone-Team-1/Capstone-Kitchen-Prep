import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setIngredients } from "../../store/ingredientSlice";
import { RootState } from "../../store";
import MuiLoader from "../MuiLoader";

interface Props {
  user: {
    id: string;
    email: string;
  };
}

const Ingredient: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  console.log("THIS IS THE USER OBJ:", user);
  //fetch ingredients by user
  const fetchIngredients = async () => {
    try {
      const userData = await axios.get(`/api/users/${user.id}`);
      dispatch(setIngredients(userData.data.ingredients));
    } catch (err) {
      console.error(err);
    }
    // }
    setLoading(false);
  };

  useEffect(() => {
    fetchIngredients();
  }, [user]);

  if (loading)
    return (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    );

  return (
    <>
      <h1>Ingredient Page</h1>
      {user.email}
      {ingredients &&
        ingredients.map((ingredient, index) => {
          return (
            <p key={index}>
              Ingredient: {ingredient.ingredient} Quantity:{" "}
              {ingredient.quantity}
            </p>
          );
        })}
    </>
  );
};

export default Ingredient;
