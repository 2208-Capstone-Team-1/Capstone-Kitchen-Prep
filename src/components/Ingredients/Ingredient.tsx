import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setIngredients,
  setDeleteIngredient,
} from "../../store/ingredientSlice";
import { RootState } from "../../store";
import MuiLoader from "../MuiLoader";
import "./ingredients.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

interface Props {
  user: {
    id: string;
    email: string;
  };
}

const Ingredient: React.FC<Props> = ({ user }) => {
  /** customs hooks */
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  //fetch ingredients by user
  const fetchIngredients = async () => {
    try {
      const userData = await axios.get(`/api/users/${user.id}`);
      dispatch(setIngredients(userData.data.ingredients));
    } catch (err) {
      console.error(err);
    }
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

  /** deleteIngredientHandler will delete an ingredient from the fridge */
  const deleteIngredientHandler = async (id: number) => {
    try {
      dispatch(setDeleteIngredient(id));
      const { data } = await axios.delete(`/api/ingredients/${id}`, {});
    } catch (error) {}
  };
  return (
    <>
      <Box className="box" sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <Grid className="grid" item xs={2} sm={4} md={4} key={index}>
                <div className="item-content">
                  <img className="itemImage" src={ingredient.imageUrl} alt="" />
                  <h4>{ingredient.ingredient}</h4>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteIngredientHandler(ingredient.id)}
                  >
                    Remove Item
                  </Button>
                </div>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default Ingredient;
