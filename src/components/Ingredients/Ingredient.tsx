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
import { Box, Button, Grid } from "@mui/material";

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
    name: "";
    quantity: 0;
  }
  //temporary place holder for ingredient to display
  // const [ingredient, setIngredient] = useState(<IngredientInterface>);
  /** redux states */

  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  console.log("user", user);
  console.log("ingredients", ingredients);
  /** validation schema using yup.
   * 1. Take an ingredient from the user through form.
   * 2. Look for the ingredient in the spoonacular API.
   * 3.  Save/send  the ingredient to the backend.
   * 4. Save it inside the ingredient redux state.
   * 5. Display the ingredient in the UI.
   */
  const formValidation = Yup.object().shape({
    name: Yup.string().required("Ingredient Name is required"),
    quantity: Yup.number().required("Quantity is required"),
  });
  const myForm = useFormik({
    initialValues: {
      name: "",
      quantity: 0,
    },
    validationSchema: formValidation,
    //  1.Take an ingredient from the user through form.
    onSubmit: async (values) => {
      console.log("line63", values.name);
      console.log("line63", values.quantity);
      try {
        //send the data to the backend
        const bodyToSubmit = {
          name: values.name,
          quantity: values.quantity,
        };
        // creating an ingredient in the DB
        const createIngredient = await axios.post(
          "/api/ingredients",
          bodyToSubmit
        );
        dispatch(addIngredient(bodyToSubmit));
        // const userData = await axios.get(`/api/users/${user.id}`);
        // dispatch(setIngredients(userData.data.ingredients));
        // console.log("userData.data", userData.data);
        // console.log("ingre", ingredients);
      } catch (err) {
        console.log(err);
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
          name="name"
          label="Ingredient Name"
          variant="outlined"
          value={myForm.values.name || ""}
          onChange={myForm.handleChange}
          onBlur={myForm.handleBlur}
          error={myForm.touched.name && Boolean(myForm.errors.name)}
          helperText={myForm.touched.name && myForm.errors.name}
        />
        <TextField
          sx={{ m: 5 }}
          className="ingredientForm"
          name="quantity"
          label="Quantity"
          variant="outlined"
          value={myForm.values.quantity || ""}
          onChange={myForm.handleChange}
          onBlur={myForm.handleBlur}
          error={myForm.touched.quantity && Boolean(myForm.errors.quantity)}
          helperText={myForm.touched.quantity && myForm.errors.quantity}
        />
        <Button
          id="addIngredient"
          sx={{ m: 5 }}
          onClick={myForm.submitForm}
          variant="contained"
        >
          Add Ingredient
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
