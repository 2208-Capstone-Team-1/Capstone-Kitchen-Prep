import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  addIngredient,
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
  TextField,
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
  /** local states */
  const [loading, setLoading] = useState(true);

  interface IngredientInterface {
    ingredient: "";
  }
  //temporary place holder for ingredient to display
  // const [ingredient, setIngredient] = useState(<IngredientInterface>);
  /** redux states */

  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  console.log("ingredients", ingredients);
  /** validation schema using yup.
   * 1. Take an ingredient from the user through form.
   * 2. Look for the ingredient in the spoonacular API.
   * 3.  Save/send  the ingredient to the backend.
   * 4. Save it inside the ingredient redux state.
   * 5. Display the ingredient in the UI.
   */
  const formValidation = Yup.object().shape({
    ingredient: Yup.string().required("Ingredient Name is required"),
  });
  const myForm = useFormik({
    initialValues: {
      ingredient: "",
    },
    validationSchema: formValidation,
    //  1.Take an ingredient from the user through form.
    onSubmit: async (value) => {
      console.log("line63", value.ingredient);
      try {
        //  2. Look for the ingredient in the spoonacular API.
        const getIngredient = await axios.get(
          `https://api.spoonacular.com/food/ingredients/search?query=${value.ingredient}&number=2&sort=calories&sortDirection=desc&apiKey=9a0bda7b9e944e938fa0a538fd4a5a77`
        );
        // console.log("line 71", getIngredient.data);
        const newIngredient = await getIngredient.data.results[1];
        console.log("line 73", newIngredient);
        // localStorage.setItem("ingredient", newIngredient);

        // 3.  Save/send  the ingredient to the backend.

        //  4. Save it inside the ingredient redux state.
        const saveProductToReduxState = dispatch(addIngredient(newIngredient));
        console.log(saveProductToReduxState);
      } catch (err) {
        // console.log(err);
      }
    },
  });

  /** form to take the ingredient input value from the user */
  // const addIngredientToForm;
  /** fetch ingredients by user */
  const fetchIngredients = async () => {
    try {
      const userData = await axios.get(`/api/users/${user.id}`);
      dispatch(setIngredients(userData.data.ingredients));
    } catch (err) {
      // console.error(err);
    }
    setLoading(false);
  };

  /** deleteIngredientHandler will delete an ingredient from the fridge */
  const deleteIngredientHandler = async (id: number) => {
    try {
      dispatch(setDeleteIngredient(id));
      const { data } = await axios.delete(`/api/ingredients/${id}`, {});
    } catch (error) {}
  };

  const getIngredientHandler = async () => {
    try {
      const getIngredient = await axios.get(
        `https://api.spoonacular.com/food/ingredients/search?query=potato&number=2&sort=calories&sortDirection=desc&apiKey=9a0bda7b9e944e938fa0a538fd4a5a77`
      );
      // console.log(getIngredient.data);
    } catch (err) {
      // console.log(err);
    }
  };

  // useEffect(() => {
  //   getIngredientHandler();
  // }, []);

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
      {/* Adding Form for adding an ingredient */}
      <Box className="form-content" margin={1}>
        <TextField
          className="ingredientForm"
          name="ingredient"
          label="Ingredient Name"
          variant="outlined"
          value={myForm.values.ingredient || ""}
          onChange={myForm.handleChange}
          onBlur={myForm.handleBlur}
          error={myForm.touched.ingredient && Boolean(myForm.errors.ingredient)}
          helperText={myForm.touched.ingredient && myForm.errors.ingredient}
        />
        <Button onClick={myForm.submitForm} variant="contained">
          Submit
        </Button>
      </Box>

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
                  <img className="itemImage" src={ingredient.image} alt="" />
                  <h4>{ingredient.name}</h4>
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
